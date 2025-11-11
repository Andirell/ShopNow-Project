"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cartcontext";

export default function AddToCart({ product, className = "" }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.title} added to cart!`);
    };

    return (
        <Button 
            onClick={handleAddToCart}
            className={`bg-[#0E290E] text-white p-3 md:p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition text-sm sm:text-base ${className}`}
        >
            Add to Cart
        </Button>
    );
}