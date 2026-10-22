from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class ProductListCreateView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProductSerializer

    def get(self, request):
        products = Product.objects.select_related('category').all()

        category = request.query_params.get('category')
        search = request.query_params.get('search')
        ordering = request.query_params.get('ordering', '-created_at')

        if category:
            products = products.filter(category_id=category)
        if search:
            products = products.filter(Q(name__icontains=search) | Q(description__icontains=search))
        if ordering in {'price', '-price', 'created_at', '-created_at', 'name', '-name'}:
            products = products.order_by(ordering)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)


class ProductDetailView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProductSerializer

    def get_object(self, product_id):
        return get_object_or_404(Product.objects.select_related('category'), id=product_id)

    def get(self, request, product_id):
        return Response(ProductSerializer(self.get_object(product_id)).data)

    def patch(self, request, product_id):
        product = self.get_object(product_id)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        return Response(ProductSerializer(product).data)

    def delete(self, request, product_id):
        product = self.get_object(product_id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryListCreateView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CategorySerializer

    def get(self, request):
        categories = Category.objects.all()
        search = request.query_params.get('search')
        if search:
            categories = categories.filter(name__icontains=search)
        return Response(CategorySerializer(categories, many=True).data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        category = serializer.save()
        return Response(CategorySerializer(category).data, status=status.HTTP_201_CREATED)


class CategoryDetailView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CategorySerializer

    def get_object(self, category_id):
        return get_object_or_404(Category, id=category_id)

    def get(self, request, category_id):
        return Response(CategorySerializer(self.get_object(category_id)).data)

    def patch(self, request, category_id):
        category = self.get_object(category_id)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        category = serializer.save()
        return Response(CategorySerializer(category).data)

    def delete(self, request, category_id):
        category = self.get_object(category_id)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
