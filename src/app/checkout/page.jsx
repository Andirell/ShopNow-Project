"use client";
import { useState } from "react";
import Link from "next/link";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cartcontext";
import { useAuth } from "@/contexts/authcontext";
import { API_URL, getProducts, formatPrice, errorMessage } from "@/lib/api";

// These match Payment.METHOD_CHOICES in backend/payments/models.py
const PAYMENT_METHODS = [
  { value: "card", label: "Card (paid now)" },
  { value: "bank_transfer", label: "Bank transfer" },
  { value: "mobile_money", label: "Mobile money" },
  { value: "cash_on_delivery", label: "Cash on delivery" },
];

export default function CheckoutPage() {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { user, loading, authRequest } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  async function placeOrder() {
    setError("");
    setPlacingOrder(true);

    // The backend needs its own product ids, so look each cart item up by slug
    const products = await getProducts();
    const items = [];
    for (const cartItem of cartItems) {
      const product = products.find((p) => p.slug === cartItem.slug);
      if (!product) {
        setError(`${cartItem.title} is no longer available. Please remove it from your cart.`);
        setPlacingOrder(false);
        return;
      }
      items.push({ product: product.id, quantity: cartItem.quantity });
    }

    // Step 1: create the order. The backend checks the stock and works out the total.
    const orderResult = await authRequest("/orders/", { method: "POST", body: { items } });
    if (!orderResult.ok) {
      setError(errorMessage(orderResult.data));
      setPlacingOrder(false);
      return;
    }
    const order = orderResult.data;

    // Step 2: create a payment for the order
    const paymentResult = await authRequest("/payments/", {
      method: "POST",
      body: { order: order.id, method: paymentMethod },
    });
    if (!paymentResult.ok) {
      setError(errorMessage(paymentResult.data));
      setPlacingOrder(false);
      return;
    }

    // Step 3: card payments are confirmed straight away. This is a demo
    // shop, so there's no real card form yet. Other methods stay "pending"
    // until the shop marks them as paid.
    let status = "pending";
    if (paymentMethod === "card") {
      const confirmResult = await authRequest(`/payments/${paymentResult.data.id}/confirm/`, {
        method: "POST",
      });
      if (confirmResult.ok) {
        status = "paid";
      }
    }

    clearCart();
    setPlacedOrder({ id: order.id, total: order.total_price, status });
    setPlacingOrder(false);
  }

  if (placedOrder) {
    return (
      <MaxwidthContainer className="py-16">
        <div className="max-w-xl mx-auto text-center space-y-4 border border-gray-300 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#0E290E]">Thank you for your order!</h1>
          <p className="text-lg">
            Order #{placedOrder.id} for {formatPrice(placedOrder.total)} has been placed.
          </p>
          <p className="text-gray-600">
            {placedOrder.status === "paid"
              ? "Your payment was successful."
              : "Your payment is pending. We will contact you to complete it."}
          </p>
          <Link href="/account" className="inline-block underline text-[#0E290E]">
            View my orders
          </Link>
        </div>
      </MaxwidthContainer>
    );
  }

  if (cartItems.length === 0) {
    return (
      <MaxwidthContainer className="py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p>Add some items to your cart before checking out</p>
        </div>
      </MaxwidthContainer>
    );
  }

  // No backend connected (for example on the live demo), so keep the old
  // demo checkout
  if (!API_URL) {
    return (
      <section className="p-10">
        <MaxwidthContainer>
          <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">Checkout</h1>
          <div className="text-center space-y-4">
            <OrderSummary cartItems={cartItems} total={getCartTotal()} />
            <Button
              onClick={() => {
                clearCart();
                setPlacedOrder({ id: "DEMO", total: getCartTotal(), status: "pending" });
              }}
              className="bg-[#0E290E] text-white py-3 px-8 rounded-lg hover:bg-[#0c230c] text-lg"
            >
              Place Order Now
            </Button>
            <p className="text-sm text-gray-600">
              This is a demo. Connect the backend to place real orders.
            </p>
          </div>
        </MaxwidthContainer>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-10">
      <MaxwidthContainer>
        <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <OrderSummary cartItems={cartItems} total={getCartTotal()} />

          <div className="border border-gray-300 rounded-2xl p-6 space-y-5">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : !user ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Log in to place your order</h2>
                <p className="text-gray-600">Your cart will still be here when you come back.</p>
                <div className="flex gap-3">
                  <Link href="/login?next=/checkout">
                    <Button className="bg-[#0E290E] text-white px-6 py-3 rounded-3xl">Log in</Button>
                  </Link>
                  <Link href="/register?next=/checkout">
                    <Button className="bg-white text-[#0E290E] border border-[#0E290E] px-6 py-3 rounded-3xl">
                      Create account
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">How would you like to pay?</h2>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => (
                    <label key={method.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                      />
                      {method.label}
                    </label>
                  ))}
                </div>

                {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

                <Button
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="w-full bg-[#0E290E] text-white py-3 rounded-lg hover:bg-[#0c230c] text-lg"
                >
                  {placingOrder ? "Placing your order..." : `Place Order (${formatPrice(getCartTotal())})`}
                </Button>
                <p className="text-sm text-gray-500">Ordering as {user.email}</p>
              </>
            )}
          </div>
        </div>
      </MaxwidthContainer>
    </section>
  );
}

function OrderSummary({ cartItems, total }) {
  return (
    <div className="border border-gray-300 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <ul className="space-y-2 mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between gap-4">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between border-t pt-4 text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
