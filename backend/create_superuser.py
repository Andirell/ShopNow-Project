import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from users.models import User

email = os.getenv('DJANGO_SUPERUSER_EMAIL')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD')
first_name = os.getenv('DJANGO_SUPERUSER_FIRST_NAME', 'Admin')
last_name = os.getenv('DJANGO_SUPERUSER_LAST_NAME', 'User')
phone_number = os.getenv('DJANGO_SUPERUSER_PHONE_NUMBER')

if not email or not password or not phone_number:
    raise RuntimeError(
        'Set DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_PASSWORD, and '
        'DJANGO_SUPERUSER_PHONE_NUMBER before running this script.'
    )

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        phone_number=phone_number,
        role='admin',
    )
    print('Superuser created')
else:
    print('Superuser already exists')
