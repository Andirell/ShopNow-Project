from products.models import Category, Product

# Create categories
cat1 = Category.objects.create(name='Electronics', slug='electronics')
cat2 = Category.objects.create(name='Books', slug='books')
cat3 = Category.objects.create(name='Clothing', slug='clothing')

# Create products
Product.objects.create(
    name='Smartphone',
    slug='smartphone',
    description='A high-end smartphone',
    price=699.99,
    stock=50,
    category=cat1
)
Product.objects.create(
    name='Laptop',
    slug='laptop',
    description='A powerful laptop for work and play',
    price=1299.99,
    stock=30,
    category=cat1
)
Product.objects.create(
    name='The Great Gatsby',
    slug='the-great-gatsby',
    description='A classic novel',
    price=14.99,
    stock=100,
    category=cat2
)
Product.objects.create(
    name='T-Shirt',
    slug='t-shirt',
    description='A comfortable cotton t-shirt',
    price=19.99,
    stock=200,
    category=cat3
)

print('Sample data created successfully!')