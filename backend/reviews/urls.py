from django.urls import path

from .views import MyReviewListView, ProductReviewListCreateView, ReviewDetailView

urlpatterns = [
    path('products/<int:product_id>/', ProductReviewListCreateView.as_view(), name='product-reviews'),
    path('mine/', MyReviewListView.as_view(), name='my-reviews'),
    path('<int:review_id>/', ReviewDetailView.as_view(), name='review-detail'),
]
