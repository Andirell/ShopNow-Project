from decimal import Decimal

from rest_framework.test import APITestCase

from orders.models import Order
from payments.models import Payment
from products.models import Category, Product
from users.models import User


class OrderAndPaymentFlowTests(APITestCase):
    # This is the same flow the frontend checkout page uses:
    # create the order, create the payment, then confirm the payment.

    def setUp(self):
        self.user = User.objects.create_user(
            email='customer@example.com', password='strong-password-123', first_name='Test', last_name='Customer'
        )
        self.client.force_authenticate(self.user)
        category = Category.objects.create(name='Audio', slug='audio')
        self.speaker = Product.objects.create(
            name='Speaker', slug='speaker-1', price=Decimal('50.00'), stock=4, category=category
        )

    def place_order(self, quantity):
        return self.client.post(
            '/api/orders/',
            {'items': [{'product': self.speaker.id, 'quantity': quantity}]},
            format='json',
        )

    def test_full_checkout_flow(self):
        order_response = self.place_order(2)
        self.assertEqual(order_response.status_code, 201)
        order_id = order_response.data['id']

        payment_response = self.client.post('/api/payments/', {'order': order_id, 'method': 'card'}, format='json')
        self.assertEqual(payment_response.status_code, 201)
        payment_id = payment_response.data['id']

        confirm_response = self.client.post(f'/api/payments/{payment_id}/confirm/', format='json')
        self.assertEqual(confirm_response.status_code, 200)

        order = Order.objects.get(id=order_id)
        self.speaker.refresh_from_db()
        self.assertEqual(order.status, 'paid')
        self.assertEqual(order.total_price, Decimal('100.00'))
        self.assertEqual(self.speaker.stock, 2)

    def test_cannot_order_more_than_stock(self):
        response = self.place_order(10)
        self.assertEqual(response.status_code, 400)
        self.speaker.refresh_from_db()
        self.assertEqual(self.speaker.stock, 4)

    def test_cannot_pay_for_cancelled_order(self):
        order_id = self.place_order(1).data['id']
        payment_id = self.client.post('/api/payments/', {'order': order_id}, format='json').data['id']

        cancel_response = self.client.patch(f'/api/orders/{order_id}/', {'status': 'cancelled'}, format='json')
        self.assertEqual(cancel_response.status_code, 200)

        confirm_response = self.client.post(f'/api/payments/{payment_id}/confirm/', format='json')
        self.assertEqual(confirm_response.status_code, 400)
        self.assertEqual(Payment.objects.get(id=payment_id).status, 'pending')

    def test_cannot_see_other_peoples_orders(self):
        order_id = self.place_order(1).data['id']

        someone_else = User.objects.create_user(
            email='other@example.com', password='strong-password-123', first_name='O', last_name='P'
        )
        self.client.force_authenticate(someone_else)

        self.assertEqual(self.client.get(f'/api/orders/{order_id}/').status_code, 404)
        self.assertEqual(self.client.get('/api/orders/').data, [])
