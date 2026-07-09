from django.urls import path
from .views import CartItemCreateView, CartItemDetailView, MyCartView

urlpatterns = [
    path('', MyCartView.as_view(), name='my-cart'),
    path('items/', CartItemCreateView.as_view(), name='cart-item-add'),
    path('items/<int:item_id>/', CartItemDetailView.as_view(), name='cart-item-detail'),
]
