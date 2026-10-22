import json
from decimal import Decimal
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from products.models import Category, Product

DATA_FILE = Path(__file__).resolve().parent.parent.parent / 'data' / 'products.json'

# New products start with this much stock. Running the command again
# does not reset the stock of products that already exist.
STARTING_STOCK = 50


class Command(BaseCommand):
    help = 'Add the ShopNow products and categories from products/data/products.json'

    def handle(self, *args, **options):
        with open(DATA_FILE) as file:
            products = json.load(file)

        created_count = 0
        updated_count = 0

        for item in products:
            category, _ = Category.objects.get_or_create(
                name=item['category'],
                defaults={'slug': slugify(item['category'])},
            )

            product_info = {
                'name': item['name'],
                'category': category,
                'price': Decimal(item['price']),
                'description': item['description'],
                'details': item['details'],
                'image_url': item['image_url'],
                'image_alt': item['image_alt'],
            }

            # Look the product up by slug, so running this twice updates
            # the products instead of making duplicates
            product = Product.objects.filter(slug=item['slug']).first()
            if product is None:
                Product.objects.create(slug=item['slug'], stock=STARTING_STOCK, **product_info)
                created_count += 1
            else:
                for field, value in product_info.items():
                    setattr(product, field, value)
                product.save()
                updated_count += 1

        self.stdout.write(self.style.SUCCESS(
            f'Done: {created_count} products added, {updated_count} updated.'
        ))
