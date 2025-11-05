"Use client";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";

export default function CartPage() {
  return (
    <section className="p-10">
      <MaxwidthContainer>
        <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">
          Your Shopping Cart
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 py-20 border border-gray-300 rounded-lg">
        <h3 className="font-bold text-2xl ">Your cart is currently empty.</h3>
        <p>Browse our <a href="/products" className="text-[#0E290E] underline" >products</a> and add items to your cart</p>
        </div>
      </MaxwidthContainer>
    </section>
    
  )
}
