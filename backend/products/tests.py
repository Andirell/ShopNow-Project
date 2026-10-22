from decimal import Decimal
from io import StringIO

from django.core.management import call_command
from rest_framework.test import APITestCase

from orders.models import Order, OrderItem
from products.models import Category, Product
from users.models import User


def make_product(name='Laptop', slug='laptop-1', stock=5):
    category, _ = Category.objects.get_or_create(name='Computing', slug='computing')
    return Product.objects.create(
        name=name,
        slug=slug,
        price=Decimal('100.00'),
        stock=stock,
        category=category,
        image_url='https://res.cloudinary.com/dxekfksjf/image/upload/laptop.jpg',
    )


class ProductApiTests(APITestCase):
    def test_list_products_includes_image_url(self):
        make_product()
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertIn('cloudinary', response.data[0]['image_url'])

    def test_get_product_by_slug(self):
        make_product(slug='ultraslim-laptop-x13-1')
        response = self.client.get('/api/products/slug/ultraslim-laptop-x13-1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['slug'], 'ultraslim-laptop-x13-1')

    def test_unknown_slug_gives_404(self):
        response = self.client.get('/api/products/slug/not-a-product/')
        self.assertEqual(response.status_code, 404)

    def test_customer_cannot_create_product(self):
        customer = User.objects.create_user(
            email='customer@example.com', password='strong-password-123', first_name='A', last_name='B'
        )
        self.client.force_authenticate(customer)
        response = self.client.post('/api/products/', {'name': 'Free TV', 'slug': 'free-tv', 'price': '1'})
        self.assertEqual(response.status_code, 403)

    def test_product_in_an_order_cannot_be_deleted(self):
        product = make_product()
        staff = User.objects.create_user(
            email='staff@example.com', password='strong-password-123', first_name='A', last_name='B', is_staff=True
        )
        order = Order.objects.create(user=staff, total_price=Decimal('100.00'))
        OrderItem.objects.create(order=order, product=product, quantity=1, price=product.price)

        self.client.force_authenticate(staff)
        response = self.client.delete(f'/api/products/{product.id}/')

        self.assertEqual(response.status_code, 400)
        self.assertTrue(Product.objects.filter(id=product.id).exists())
        self.assertEqual(order.items.count(), 1)


class SeedProductsTests(APITestCase):
    def test_seed_adds_all_products_once(self):
        call_command('seed_products', stdout=StringIO())
        self.assertEqual(Product.objects.count(), 72)

        # Running it again updates the products instead of adding copies
        call_command('seed_products', stdout=StringIO())
        self.assertEqual(Product.objects.count(), 72)

        product = Product.objects.get(slug='ultraslim-laptop-x13-1')
        self.assertEqual(product.price, Decimal('899'))
        self.assertEqual(product.category.name, 'Computing & Tablets')

    def test_seed_does_not_reset_stock(self):
        call_command('seed_products', stdout=StringIO())
        Product.objects.filter(slug='ultraslim-laptop-x13-1').update(stock=3)

        call_command('seed_products', stdout=StringIO())
        self.assertEqual(Product.objects.get(slug='ultraslim-laptop-x13-1').stock, 3)
