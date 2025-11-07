"use client";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";

export default function CartPage() {
  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10">
      <MaxwidthContainer>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-[#0E290E]">
          Your Shopping Cart
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 py-12 sm:py-16 md:py-20 border border-gray-300 rounded-lg">
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">Your cart is currently empty.</h3>
          <p className="text-sm sm:text-base md:text-lg">Browse our <a href="/products" className="text-[#0E290E] underline">products</a> and add items to your cart</p>
        </div>
      </MaxwidthContainer>
    </section>
  )
}