from django.urls import path
from .views import MyCartView, CartItemView

urlpatterns = [
    path('', MyCartView.as_view(), name='my-cart'),
    path('items/', CartItemView.as_view(), name='cart-item-add'),
    path('items/<int:item_id>/', CartItemView.as_view(), name='cart-item-detail'),
]
