from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import get_object_or_404
from products.models import Product
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


def _get_or_create_cart(user):
    """Each user has exactly one cart — create it lazily on first access."""
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


class MyCartView(APIView):
    """
    GET  /api/cart/         → return current user's cart with items
    DELETE /api/cart/       → clear the cart
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = _get_or_create_cart(request.user)
        return Response(CartSerializer(cart).data)

    def delete(self, request):
        cart = _get_or_create_cart(request.user)
        cart.items.all().delete()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class CartItemView(APIView):
    """
    POST   /api/cart/items/        → {product_id, quantity}  (add or merge)
    PATCH  /api/cart/items/<id>/   → {quantity}              (update)
    DELETE /api/cart/items/<id>/   → remove item
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart = _get_or_create_cart(request.user)
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data.get('quantity', 1)

        item, created = CartItem.objects.get_or_create(
            cart=cart, product=product,
            defaults={'quantity': quantity},
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

    def patch(self, request, item_id):
        cart = _get_or_create_cart(request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        quantity = request.data.get('quantity')
        if quantity is None or int(quantity) < 1:
            return Response(
                {'detail': 'quantity must be >= 1'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        item.quantity = int(quantity)
        item.save()
        return Response(CartSerializer(cart).data)

    def delete(self, request, item_id):
        cart = _get_or_create_cart(request.user)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        item.delete()
        return Response(CartSerializer(cart).data)
