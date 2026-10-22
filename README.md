# ShopNow

ShopNow is an online gadget store. You can browse laptops, audio gear, cameras and smart home products, add them to a cart, create an account and place orders.

The project has two parts in one repo:

- **Frontend** – Next.js 15, React 19 and Tailwind CSS (in the root folder)
- **Backend** – a Django REST API with JWT login (in `backend/`)

## Features

- 72 products in 6 categories, with search and category filters
- Product and deal pages with prices and stock
- Cart with quantities and a running total (saved in the browser)
- Sign up and log in (JWT tokens, refreshed automatically)
- Checkout that creates a real order and payment in the backend
  - Card payments are marked as paid straight away (demo payment, no real card form yet)
  - Bank transfer, mobile money and cash on delivery stay "pending"
- "My orders" page where customers can track and cancel pending orders
- Stock goes down when an order is placed and comes back when it is cancelled
- Django admin for managing products, categories, orders and payments
- API docs with Swagger at `/api/docs/`

## Project structure

```
shopnow/
├── src/
│   ├── app/                 # pages: home, products, deals, cart, checkout, login, register, account...
│   ├── components/          # navbar, footer, product card, home page sections, ui
│   ├── contexts/            # cartcontext (the cart) and authcontext (login)
│   └── lib/api.js           # all the calls to the backend
└── backend/
    ├── config/              # Django settings and main urls
    ├── users/               # sign up, log in, current user
    ├── products/            # products and categories (+ seed_products command)
    ├── cart/                # server-side cart
    ├── checkout/            # turns the server cart into an order
    ├── orders/              # orders and order items
    ├── payments/            # payments for orders
    └── reviews/             # product reviews
```

## Running it on your computer

You need Python 3.12+ and Node.js 20+.

### 1. Start the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then set DEBUG=True for local development
python manage.py migrate
python manage.py seed_products  # adds the 72 products
python manage.py createsuperuser
python manage.py runserver
```

The API runs at http://localhost:8000/api/ and the admin at http://localhost:8000/admin/.

`seed_products` is safe to run again. It updates the products instead of adding copies, and it doesn't reset the stock.

### 2. Start the frontend

In a second terminal, from the project root:

```bash
npm install
npm run dev
```

Open http://localhost:3000. In development the frontend talks to `http://localhost:8000/api` by default.

If the backend isn't running, the frontend still shows the products from `src/components/constants/product.js`, and checkout falls back to a demo order.

## Environment variables

**Frontend** (`.env.local`, or the Vercel project settings)

| Name | What it's for |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Address of the backend API, e.g. `https://your-backend.onrender.com/api`. If it's not set in production, the site uses the local product list. |

**Backend** (`backend/.env`, see `backend/.env.example`)

| Name | What it's for |
| --- | --- |
| `SECRET_KEY` | Django secret key. Required when `DEBUG` is off. |
| `DEBUG` | `True` on your computer, `False` on a live server |
| `ALLOWED_HOSTS` | Domains the backend can be reached on, comma separated |
| `CORS_ALLOWED_ORIGINS` | Websites allowed to call the API, e.g. `https://your-site.vercel.app` |
| `EMAIL_*`, `APP_PASSWORD` | Email settings (optional) |

## API endpoints

| Method | Endpoint | What it does |
| --- | --- | --- |
| POST | `/api/users/register/` | Create an account, returns tokens |
| POST | `/api/users/login/` | Log in with email and password |
| POST | `/api/users/token/refresh/` | Get a new access token |
| GET | `/api/users/me/` | The logged-in user |
| GET | `/api/products/` | All products (`?search=`, `?category=<id>`, `?ordering=price`) |
| GET | `/api/products/slug/<slug>/` | One product by its slug |
| GET/POST | `/api/products/categories/` | Categories (only staff can add) |
| GET/DELETE | `/api/cart/` | The server-side cart |
| POST | `/api/cart/items/` | Add to the server-side cart |
| GET/POST | `/api/checkout/` | Turn the server-side cart into an order |
| GET/POST | `/api/orders/` | My orders / place an order |
| PATCH | `/api/orders/<id>/` | Cancel a pending order (staff can change any status) |
| POST | `/api/payments/` | Create a payment for an order |
| POST | `/api/payments/<id>/confirm/` | Mark a payment as paid |
| GET/POST | `/api/reviews/products/<product_id>/` | Product reviews |

Full details are in the Swagger docs at http://localhost:8000/api/docs/.

## Tests

```bash
cd backend
python manage.py test
```

The tests cover products, the seed command, ordering, payments, stock and checkout.

## Deploying

- **Frontend:** Vercel. Set `NEXT_PUBLIC_API_URL` once the backend is online.
- **Backend:** any Python host, e.g. Render or Railway. Set `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`, then run `python manage.py migrate` and `python manage.py seed_products`. The backend uses SQLite, so use a host with a persistent disk, or switch the database to PostgreSQL.

---

Made by DevAndi
