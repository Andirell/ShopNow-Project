from django.urls import path

from .views import PaymentConfirmView, PaymentDetailView, PaymentListCreateView

urlpatterns = [
    path('', PaymentListCreateView.as_view(), name='payment-list'),
    path('<int:payment_id>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('<int:payment_id>/confirm/', PaymentConfirmView.as_view(), name='payment-confirm'),
]
