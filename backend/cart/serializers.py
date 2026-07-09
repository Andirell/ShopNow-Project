from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

    def validate_product_id(self, value):
        from products.models import Product
        if not Product.objects.filter(id=value).exists():
            raise serializers.ValidationError("Product does not exist.")
        return value

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be >= 1.")
        return value

    def validate(self, attrs):
        # Convert product_id -> product instance for view convenience
        from products.models import Product
        attrs['product'] = Product.objects.get(id=attrs['product_id'])
        return attrs


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'item_count']
        read_only_fields = ['user']

    def get_total_price(self, obj) -> str:
        return str(obj.total_price)

    def get_item_count(self, obj) -> int:
        return obj.item_count
