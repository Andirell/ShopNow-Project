from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product
from .models import Review
from .serializers import ReviewCreateSerializer, ReviewSerializer


class ProductReviewListCreateView(APIView):
    serializer_class = ReviewCreateSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        reviews = Review.objects.select_related('user', 'product').filter(product=product)
        return Response(ReviewSerializer(reviews, many=True).data)

    def post(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        serializer = ReviewCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            review = serializer.save(product=product, user=request.user)
        except IntegrityError:
            return Response(
                {'detail': 'You have already reviewed this product.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)


class MyReviewListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReviewSerializer

    def get(self, request):
        reviews = Review.objects.select_related('user', 'product').filter(user=request.user)
        return Response(ReviewSerializer(reviews, many=True).data)


class ReviewDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReviewSerializer

    def get_object(self, request, review_id):
        reviews = Review.objects.select_related('user', 'product')
        if not request.user.is_staff:
            reviews = reviews.filter(user=request.user)
        return get_object_or_404(reviews, id=review_id)

    def get(self, request, review_id):
        return Response(ReviewSerializer(self.get_object(request, review_id)).data)

    def patch(self, request, review_id):
        review = self.get_object(request, review_id)
        serializer = ReviewCreateSerializer(review, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        review = serializer.save()
        return Response(ReviewSerializer(review).data)

    def delete(self, request, review_id):
        review = self.get_object(request, review_id)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
