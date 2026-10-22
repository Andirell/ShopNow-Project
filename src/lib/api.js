import { differentProducts } from "@/components/constants/product";

// Where the Django API lives. On your computer it is localhost:8000.
// On Vercel, set NEXT_PUBLIC_API_URL to the hosted backend address.
// If it's not set in production, the site uses the product list in
// constants/product.js, so the shop still works without the backend.
const LOCAL_API_URL = "http://localhost:8000/api";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "" : LOCAL_API_URL);

// Same rule as the backend's products.json: "Pro Tablet 11 Max" with id 2
// becomes "pro-tablet-11-max-2"
export function makeSlug(title, id) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${id}`;
}

export function formatPrice(price) {
  return `$${Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

// The backend and the local list name things differently, so we turn
// both into the same shape that the components use.
function productFromApi(product) {
  return {
    id: product.id,
    slug: product.slug,
    title: product.name,
    description: product.description,
    details: product.details,
    src: product.image_url || product.image,
    alt: product.image_alt || product.name,
    category: product.category ? product.category.name : "",
    price: Number(product.price),
    stock: product.stock,
  };
}

function productFromLocalList(product) {
  return {
    id: product.id,
    slug: makeSlug(product.title, product.id),
    title: product.title,
    description: product.description,
    details: product.details,
    src: product.src,
    alt: product.alt,
    category: product.category,
    price: Number(product.price.replace(/[^0-9.]/g, "")),
    stock: null,
  };
}

function localProducts() {
  return differentProducts.map(productFromLocalList);
}

export async function getProducts() {
  if (!API_URL) {
    return localProducts();
  }

  try {
    const response = await fetch(`${API_URL}/products/?ordering=created_at`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    return data.map(productFromApi);
  } catch (error) {
    // The backend isn't running, so show the local products instead
    console.warn("Could not load products from the API, using the local list.", error);
    return localProducts();
  }
}

export async function getProduct(slug) {
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/products/slug/${slug}/`, {
        cache: "no-store",
      });
      if (response.status === 404) {
        return null;
      }
      if (response.ok) {
        return productFromApi(await response.json());
      }
    } catch (error) {
      console.warn("Could not load the product from the API, using the local list.", error);
    }
  }

  const product = localProducts().find((item) => item.slug === slug);
  return product || null;
}

// Sends a request to the API and gives back { ok, status, data }
// so the pages can show the error message from the backend.
export async function sendRequest(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    let data = null;
    if (response.status !== 204) {
      data = await response.json().catch(() => null);
    }
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: { detail: "Can't reach the server right now. Please try again later." },
    };
  }
}

// Django sends errors in a few shapes: {"detail": "..."},
// {"email": ["..."]} or {"items": "..."}. This turns any of them into one line.
export function errorMessage(data) {
  if (!data) {
    return "Something went wrong. Please try again.";
  }
  if (typeof data.detail === "string") {
    return data.detail;
  }

  const messages = [];
  for (const [field, value] of Object.entries(data)) {
    const text = Array.isArray(value) ? value.join(" ") : String(value);
    if (field === "non_field_errors") {
      messages.push(text);
    } else {
      messages.push(`${field.replace(/_/g, " ")}: ${text}`);
    }
  }
  return messages.join(" ") || "Something went wrong. Please try again.";
}
