"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cartcontext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert(`${product.title} added to cart!`)
  };

  return (
    <Card className="w-fit">
      <Link href={`/products/${product.title.toLowerCase().replace(/\s+/g, "-")}-${product.id}`}>
        <CardContent className="space-y-1">
          <div className="relative h-[300px] w-[250px]">
            <Image
              src={product.src}
              width={300}
              height={200}
              alt={product.alt}
              className="object-cover rounded-2xl"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#0E290E] mt-2">{product.title}</h3>
          <p className="text-sm font-light">{product.description}</p>
          <div className="flex gap-2 items-center">
            <div>
              <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
              <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
              <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
              <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
              <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
            </div>
            <p>(172)</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter>
        <Button onClick={handleAddToCart} className="bg-[#0E290E] w-full text-white p-4 rounded-3xl hover:bg-[#0c230c] transition">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}