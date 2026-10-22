from rest_framework import serializers

from payments.models import Payment


class CheckoutSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(choices=Payment.METHOD_CHOICES, default='card')
