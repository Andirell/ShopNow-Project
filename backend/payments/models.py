from django.db import models
from django.conf import settings
from django.utils import timezone

from orders.models import Order


class Payment(models.Model):
    METHOD_CHOICES = [
        ('card', 'Card'),
        ('mobile_money', 'Mobile Money'),
        ('bank_transfer', 'Bank Transfer'),
        ('cash_on_delivery', 'Cash on Delivery'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    order = models.OneToOneField(Order, related_name='payment', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='payments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=30, choices=METHOD_CHOICES, default='card')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=120, unique=True, blank=True, null=True)
    paid_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Payment {self.id} - Order {self.order_id} - {self.status}'

    def mark_successful(self, transaction_id=None):
        self.status = 'successful'
        if transaction_id:
            self.transaction_id = transaction_id
        self.paid_at = timezone.now()
        self.save(update_fields=['status', 'transaction_id', 'paid_at', 'updated_at'])

        self.order.status = 'paid'
        self.order.save(update_fields=['status', 'updated_at'])
