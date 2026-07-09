from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'user', 'amount', 'method', 'status', 'created_at']
    list_filter = ['method', 'status', 'created_at']
    search_fields = ['order__id', 'user__email', 'transaction_id']
    readonly_fields = ['amount', 'transaction_id', 'paid_at', 'created_at', 'updated_at']
