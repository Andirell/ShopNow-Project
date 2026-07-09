from django.urls import path

from .views import (
    CategoryDetailView,
    CategoryListCreateView,
    ProductDetailView,
    ProductListCreateView,
)

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list'),
    path('<int:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:category_id>/', CategoryDetailView.as_view(), name='category-detail'),
]
