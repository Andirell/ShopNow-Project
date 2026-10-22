# ShopNow Backend

Django REST API for the ShopNow ecommerce project.

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Copy the environment template:

```bash
cp .env.example .env
```

4. Fill in the required values in `.env`.
5. Run migrations:

```bash
python manage.py migrate
```

6. Start the development server:

```bash
python manage.py runserver
```

## API Docs

When the server is running, API documentation is available at:

```text
http://127.0.0.1:8000/api/docs/
```

## Main Endpoints

```text
POST   /api/users/register/
POST   /api/users/login/
POST   /api/users/token/refresh/
GET    /api/users/me/

GET    /api/products/
POST   /api/products/
GET    /api/products/<id>/
PATCH  /api/products/<id>/
DELETE /api/products/<id>/

GET    /api/products/categories/
POST   /api/products/categories/

GET    /api/cart/
DELETE /api/cart/
POST   /api/cart/items/
PATCH  /api/cart/items/<id>/
DELETE /api/cart/items/<id>/

GET    /api/checkout/
POST   /api/checkout/

GET    /api/orders/
POST   /api/orders/
GET    /api/orders/<id>/
PATCH  /api/orders/<id>/

GET    /api/payments/
POST   /api/payments/
GET    /api/payments/<id>/
POST   /api/payments/<id>/confirm/

GET    /api/reviews/products/<product_id>/
POST   /api/reviews/products/<product_id>/
GET    /api/reviews/mine/
GET    /api/reviews/<id>/
PATCH  /api/reviews/<id>/
DELETE /api/reviews/<id>/
```
