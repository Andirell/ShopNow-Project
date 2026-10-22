import uuid

from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Payment
from .serializers import PaymentCreateSerializer, PaymentSerializer


def _payments_for_user(user):
    payments = Payment.objects.select_related('order', 'user')
    if user.is_staff:
        return payments
    return payments.filter(user=user)


class PaymentListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentCreateSerializer

    def get(self, request):
        serializer = PaymentSerializer(_payments_for_user(request.user), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PaymentCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        payment = serializer.save()
        return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)


class PaymentDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializer

    def get_object(self, request, payment_id):
        return get_object_or_404(_payments_for_user(request.user), id=payment_id)

    def get(self, request, payment_id):
        return Response(PaymentSerializer(self.get_object(request, payment_id)).data)


class PaymentConfirmView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSerializer

    def post(self, request, payment_id):
        payment = get_object_or_404(_payments_for_user(request.user), id=payment_id)

        if payment.status == 'successful':
            return Response(PaymentSerializer(payment).data)
        if payment.status != 'pending':
            return Response(
                {'detail': 'Only pending payments can be confirmed.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if payment.order.status == 'cancelled':
            return Response(
                {'detail': 'Cancelled orders cannot be paid.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        transaction_id = request.data.get('transaction_id') or f'txn_{uuid.uuid4().hex}'
        payment.mark_successful(transaction_id=transaction_id)
        return Response(PaymentSerializer(payment).data)
