"use client";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { useCart } from "@/contexts/cartcontext";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const handleCheckout = () => {
    alert("Order placed successfully! Thank you for your purchase!");
    clearCart();
    window.location.href = "/";
  };

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

  return (
    <section className="p-10">
      <MaxwidthContainer>
        <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">Checkout</h1>
        
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="mb-4">You have {cartItems.length} items in your cart</p>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2">Items in your order:</h3>
            {cartItems.map((item, index) => (
              <p key={index}>• {item.title} - {item.price}</p>
            ))}
          </div>

          <Button 
            onClick={handleCheckout}
            className="bg-[#0E290E] text-white py-3 px-8 rounded-lg hover:bg-[#0c230c] text-lg"
          >
            Place Order Now
          </Button>
          
          <p className="mt-4 text-sm text-gray-600">
            This is a demo. In a real store, you would enter shipping and payment info here.
          </p>
        </div>
      </MaxwidthContainer>
    </section>
  );
}