from django.db import transaction
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.models import Cart
from cart.serializers import CartSerializer
from orders.models import Order, OrderItem
from orders.serializers import OrderReadSerializer
from payments.models import Payment
from payments.serializers import PaymentSerializer
from products.models import Product
from .serializers import CheckoutSerializer


class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CheckoutSerializer

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return Response(
            {
                'cart': CartSerializer(cart).data,
                'payment_methods': [method[0] for method in Payment.METHOD_CHOICES],
            }
        )

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment_method = serializer.validated_data['payment_method']

        cart, _ = Cart.objects.prefetch_related('items__product').get_or_create(user=request.user)
        cart_items = list(cart.items.select_related('product'))

        if not cart_items:
            return Response(
                {'detail': 'Your cart is empty.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            product_ids = [item.product_id for item in cart_items]
            products = {
                product.id: product
                for product in Product.objects.select_for_update().filter(id__in=product_ids)
            }

            for item in cart_items:
                product = products[item.product_id]
                if product.stock < item.quantity:
                    return Response(
                        {'detail': f'{product.name} only has {product.stock} in stock.'},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            order = Order.objects.create(user=request.user, status='pending')
            total = 0

            for item in cart_items:
                product = products[item.product_id]
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item.quantity,
                    price=product.price,
                )
                total += product.price * item.quantity
                product.stock -= item.quantity
                product.save(update_fields=['stock'])

            order.total_price = total
            order.save(update_fields=['total_price'])

            payment = Payment.objects.create(
                order=order,
                user=request.user,
                amount=total,
                method=payment_method,
                status='pending',
            )
            cart.items.all().delete()

        return Response(
            {
                'order': OrderReadSerializer(order).data,
                'payment': PaymentSerializer(payment).data,
            },
            status=status.HTTP_201_CREATED,
        )
