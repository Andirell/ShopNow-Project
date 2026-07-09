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
