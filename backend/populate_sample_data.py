import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from products.models import Category, Product

# Clear existing data
Product.objects.all().delete()
Category.objects.all().delete()

# Create categories
cat1 = Category.objects.create(name='Computing & Tablets', slug='computing-tablets')
cat2 = Category.objects.create(name='Music Gadgets', slug='music-gadgets')
cat3 = Category.objects.create(name='Camera & Lenses', slug='camera-lenses')

# Create products
Product.objects.create(
    name='UltraSlim Laptop X13',
    slug='ultraslim-laptop-x13',
    description='Lightweight laptop with high-speed performance and all-day battery life.',
    price=999.99,
    stock=50,
    category=cat1
)
Product.objects.create(
    name='Pro Tablet 11 Max',
    slug='pro-tablet-11-max',
    description='Versatile tablet perfect for work, drawing, and entertainment.',
    price=499.99,
    stock=30,
    category=cat1
)
Product.objects.create(
    name='Ergo Wireless Mouse',
    slug='ergo-wireless-mouse',
    description='Ergonomic mouse designed for smooth and silent clicks.',
    price=49.99,
    stock=100,
    category=cat1
)
Product.objects.create(
    name='Mechanical Keyboard RGB',
    slug='mechanical-keyboard-rgb',
    description='Tactile keys and customizable lighting for every gamer and creator.',
    price=89.99,
    stock=75,
    category=cat1
)
Product.objects.create(
    name='Laptop Cooling Pad Pro',
    slug='laptop-cooling-pad-pro',
    description='Keep your laptop cool even under heavy performance load.',
    price=39.99,
    stock=60,
    category=cat1
)
Product.objects.create(
    name='Wireless Charging Dock',
    slug='wireless-charging-dock',
    description='Charge your tablet, phone, and smartwatch simultaneously.',
    price=59.99,
    stock=40,
    category=cat1
)
Product.objects.create(
    name='Tablet Keyboard Case',
    slug='tablet-keyboard-case',
    description='Turn your tablet into a mini laptop with detachable keyboard.',
    price=34.99,
    stock=80,
    category=cat1
)
Product.objects.create(
    name='HD Webcam Pro',
    slug='hd-webcam-pro',
    description='1080p webcam with built-in microphone for meetings.',
    price=79.99,
    stock=90,
    category=cat1
)
Product.objects.create(
    name='USB-C Hub 8-in-1',
    slug='usb-c-hub-8-in-1',
    description='Expand your connectivity with HDMI, USB, SD, and more.',
    price=45.99,
    stock=110,
    category=cat1
)
Product.objects.create(
    name='External SSD 1TB',
    slug='external-ssd-1tb',
    description='Ultra-fast portable storage for all your files and media.',
    price=129.99,
    stock=55,
    category=cat1
)
Product.objects.create(
    name='Smart Stylus Pen',
    slug='smart-stylus-pen',
    description='Precision stylus for drawing, note-taking, and design.',
    price=29.99,
    stock=120,
    category=cat1
)
Product.objects.create(
    name='Adjustable Laptop Stand',
    slug='adjustable-laptop-stand',
    description='Ergonomic aluminum stand for comfort and airflow.',
    price=24.99,
    stock=95,
    category=cat1
)
Product.objects.create(
    name='Wireless Headphones X1',
    slug='wireless-headphones-x1',
    description='Noise-cancelling headphones for immersive listening.',
    price=199.99,
    stock=40,
    category=cat2
)
Product.objects.create(
    name='Bluetooth Speaker Mini',
    slug='bluetooth-speaker-mini',
    description='Portable speaker with booming sound and compact design.',
    price=39.99,
    stock=85,
    category=cat2
)
Product.objects.create(
    name='Noise Cancelling Earbuds',
    slug='noise-cancelling-earbuds',
    description='Block out distractions with immersive clarity.',
    price=89.99,
    stock=70,
    category=cat2
)
Product.objects.create(
    name='Smart Soundbar',
    slug='smart-soundbar',
    description='Powerful soundbar with deep bass and smart controls.',
    price=249.99,
    stock=25,
    category=cat2
)
Product.objects.create(
    name='Vinyl Turntable Retro',
    slug='vinyl-turntable-retro',
    description='Classic turntable with modern Bluetooth connection.',
    price=179.99,
    stock=15,
    category=cat2
)
Product.objects.create(
    name='Studio Microphone Set',
    slug='studio-microphone-set',
    description='High-fidelity recording mic for music and podcasting.',
    price=149.99,
    stock=30,
    category=cat2
)
Product.objects.create(
    name='DJ Mixer Console',
    slug='dj-mixer-console',
    description='Professional-grade mixer for live sessions and recording.',
    price=399.99,
    stock=10,
    category=cat2
)
Product.objects.create(
    name='Smart Glasses Vision',
    slug='smart-glasses-vision',
    description='Glasses that sync with music and phone notifications.',
    price=299.99,
    stock=20,
    category=cat2
)
Product.objects.create(
    name='Bass Booster Headset',
    slug='bass-booster-headset',
    description='Rich, deep sound experience with comfortable design.',
    price=129.99,
    stock=40,
    category=cat2
)
Product.objects.create(
    name='Smart Bluetooth Cap',
    slug='smart-bluetooth-cap',
    description='Hat with built-in speakers and mic for wireless calls.',
    price=49.99,
    stock=60,
    category=cat2
)

print('Sample data created successfully!')