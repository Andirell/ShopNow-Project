from rest_framework import serializers

from orders.models import Order
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    order_status = serializers.CharField(source='order.status', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id',
            'order',
            'order_status',
            'amount',
            'method',
            'status',
            'transaction_id',
            'paid_at',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'order_status',
            'amount',
            'status',
            'transaction_id',
            'paid_at',
            'created_at',
            'updated_at',
        ]


class PaymentCreateSerializer(serializers.Serializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    method = serializers.ChoiceField(choices=Payment.METHOD_CHOICES, default='card')

    def validate_order(self, order):
        request = self.context['request']

        if not request.user.is_staff and order.user != request.user:
            raise serializers.ValidationError('You can only pay for your own orders.')
        if order.status == 'cancelled':
            raise serializers.ValidationError('Cancelled orders cannot be paid.')
        if hasattr(order, 'payment'):
            raise serializers.ValidationError('This order already has a payment.')
        if order.total_price <= 0:
            raise serializers.ValidationError('Order total must be greater than zero.')
        return order

    def create(self, validated_data):
        order = validated_data['order']
        return Payment.objects.create(
            order=order,
            user=order.user,
            amount=order.total_price,
            method=validated_data['method'],
            status='pending',
        )
