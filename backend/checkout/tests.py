from decimal import Decimal

from rest_framework.test import APITestCase

from cart.models import Cart, CartItem
from orders.models import Order
from payments.models import Payment
from products.models import Category, Product
from users.models import User


class CheckoutFlowTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='customer@example.com',
            password='strong-password-123',
            first_name='Test',
            last_name='Customer',
            phone_number='5550001',
        )
        self.client.force_authenticate(self.user)

        self.category = Category.objects.create(name='Computing', slug='computing')
        self.product = Product.objects.create(
            name='Laptop',
            slug='laptop',
            description='Portable computer',
            price=Decimal('1000.00'),
            stock=5,
            category=self.category,
        )
        self.cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=2)

    def test_checkout_creates_order_payment_and_clears_cart(self):
        response = self.client.post('/api/checkout/', {'payment_method': 'card'}, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(Payment.objects.count(), 1)
        self.assertEqual(self.cart.items.count(), 0)

        order = Order.objects.get()
        payment = Payment.objects.get()
        self.product.refresh_from_db()

        self.assertEqual(order.user, self.user)
        self.assertEqual(order.total_price, Decimal('2000.00'))
        self.assertEqual(payment.order, order)
        self.assertEqual(payment.status, 'pending')
        self.assertEqual(self.product.stock, 3)

    def test_payment_confirmation_marks_order_paid(self):
        checkout_response = self.client.post('/api/checkout/', {'payment_method': 'card'}, format='json')
        payment_id = checkout_response.data['payment']['id']

        response = self.client.post(
            f'/api/payments/{payment_id}/confirm/',
            {'transaction_id': 'txn_test_001'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)

        payment = Payment.objects.get(id=payment_id)
        payment.order.refresh_from_db()

        self.assertEqual(payment.status, 'successful')
        self.assertEqual(payment.transaction_id, 'txn_test_001')
        self.assertEqual(payment.order.status, 'paid')
