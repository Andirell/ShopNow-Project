from django.urls import path

from .views import (
    CategoryDetailView,
    CategoryListCreateView,
    ProductBySlugView,
    ProductDetailView,
    ProductListCreateView,
)

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list'),
    path('<int:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    path('slug/<slug:slug>/', ProductBySlugView.as_view(), name='product-by-slug'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:category_id>/', CategoryDetailView.as_view(), name='category-detail'),
]
