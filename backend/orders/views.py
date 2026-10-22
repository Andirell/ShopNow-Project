from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product
from .models import Order
from .serializers import OrderCreateSerializer, OrderReadSerializer


def _orders_for_user(user):
    orders = Order.objects.prefetch_related('items__product__category').order_by('-created_at')
    if user.is_staff:
        return orders
    return orders.filter(user=user)


def _restore_order_stock(order):
    product_ids = [item.product_id for item in order.items.all()]
    products = {
        product.id: product
        for product in Product.objects.select_for_update().filter(id__in=product_ids)
    }
    for item in order.items.all():
        product = products[item.product_id]
        product.stock += item.quantity
        product.save(update_fields=['stock'])


class OrderListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderCreateSerializer

    def get(self, request):
        serializer = OrderReadSerializer(_orders_for_user(request.user), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(OrderReadSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderReadSerializer

    def get_object(self, request, order_id):
        return get_object_or_404(_orders_for_user(request.user), id=order_id)

    def get(self, request, order_id):
        return Response(OrderReadSerializer(self.get_object(request, order_id)).data)

    def patch(self, request, order_id):
        order = self.get_object(request, order_id)
        new_status = request.data.get('status')
        valid_statuses = {choice[0] for choice in Order.STATUS_CHOICES}

        if new_status not in valid_statuses:
            return Response(
                {'detail': 'A valid status is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not request.user.is_staff and new_status != 'cancelled':
            return Response(
                {'detail': 'Only staff can update order status.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        if not request.user.is_staff and order.status != 'pending':
            return Response(
                {'detail': 'Only pending orders can be cancelled.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            order = Order.objects.select_for_update().get(id=order.id)
            was_cancelled = order.status == 'cancelled'
            order.status = new_status
            order.save(update_fields=['status', 'updated_at'])

            if new_status == 'cancelled' and not was_cancelled:
                _restore_order_stock(order)

        return Response(OrderReadSerializer(order).data)
