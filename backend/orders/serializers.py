from django.db import transaction
from rest_framework import serializers

from products.models import Product
from products.serializers import ProductSerializer
from .models import Order, OrderItem


class OrderItemReadSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'total_price']

    def get_total_price(self, obj) -> str:
        return str(obj.total_price)


class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)
    payment_status = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'created_at',
            'updated_at',
            'total_price',
            'status',
            'payment_status',
            'items',
        ]
        read_only_fields = fields

    def get_payment_status(self, obj) -> str | None:
        payment = getattr(obj, 'payment', None)
        return payment.status if payment else None


class OrderItemWriteSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    quantity = serializers.IntegerField(min_value=1)


class OrderCreateSerializer(serializers.Serializer):
    items = OrderItemWriteSerializer(many=True)

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError('At least one item is required.')

        product_ids = set()
        for item in items:
            product_id = item['product'].id
            if product_id in product_ids:
                raise serializers.ValidationError('Duplicate products are not allowed.')
            product_ids.add(product_id)
        return items

    def create(self, validated_data):
        user = self.context['request'].user
        items_data = validated_data['items']

        with transaction.atomic():
            product_ids = [item['product'].id for item in items_data]
            products = {
                product.id: product
                for product in Product.objects.select_for_update().filter(id__in=product_ids)
            }

            for item in items_data:
                product = products[item['product'].id]
                quantity = item['quantity']
                if product.stock < quantity:
                    raise serializers.ValidationError(
                        {'items': f'{product.name} only has {product.stock} in stock.'}
                    )

            order = Order.objects.create(user=user, status='pending')
            total = 0

            for item in items_data:
                product = products[item['product'].id]
                quantity = item['quantity']
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=product.price,
                )
                total += product.price * quantity
                product.stock -= quantity
                product.save(update_fields=['stock'])

            order.total_price = total
            order.save(update_fields=['total_price'])
            return order
