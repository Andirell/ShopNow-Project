"use client";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { useCart } from "@/contexts/cartcontext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/api";

export default function CartPage() {
  const { cartItems, changeQuantity, removeFromCart, clearCart, getCartItemsCount, getCartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <section className="p-4 sm:p-6 md:p-8 lg:p-10">
        <MaxwidthContainer>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-[#0E290E]">
            Your Shopping Cart
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 py-12 sm:py-16 md:py-20 border border-gray-300 rounded-lg">
            <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">Your cart is currently empty.</h3>
            <p className="text-sm sm:text-base md:text-lg">
              Browse our{" "}
              <Link href="/products" className="text-[#0E290E] underline">
                products
              </Link>{" "}
              and add items to your cart
            </p>
          </div>
        </MaxwidthContainer>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10">
      <MaxwidthContainer>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E290E]">
            Your Shopping Cart ({getCartItemsCount()} items)
          </h1>
          <Button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-300 rounded-lg"
            >
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src={item.src} alt={item.alt} fill className="object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-semibold text-lg text-[#0E290E] hover:underline">{item.title}</h3>
                </Link>
                <p className="text-gray-600">{formatPrice(item.price)} each</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-[#0E290E] text-[#0E290E] font-bold"
                  aria-label={`Remove one ${item.title}`}
                >
                  -
                </button>
                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-[#0E290E] text-[#0E290E] font-bold"
                  aria-label={`Add one more ${item.title}`}
                >
                  +
                </button>
              </div>

              <p className="font-bold w-24 sm:text-right">{formatPrice(item.price * item.quantity)}</p>

              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 border border-gray-300 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg">Total Items:</span>
            <span className="text-lg font-semibold">{getCartItemsCount()}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold text-[#0E290E]">{formatPrice(getCartTotal())}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full bg-[#0E290E] text-white py-3 rounded-lg hover:bg-[#0c230c] text-lg">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </MaxwidthContainer>
    </section>
  );
}
