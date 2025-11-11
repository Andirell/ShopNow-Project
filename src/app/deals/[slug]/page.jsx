"use client";

import React from "react";
import { useParams } from "next/navigation";
import { differentProducts } from "@/components/constants/product";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cartcontext";

export default function DealPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const product = differentProducts.find((item) => {
    const itemSlug = `${item.title.toLowerCase().replace(/\s+/g, "-")}-${item.id}`;
    return itemSlug === slug;
  });

  if (!product) {
    return (
      <MaxwidthContainer className="py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
          Product not found
        </h2>
      </MaxwidthContainer>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.title} Deal claimed!`);
  };

  return (
    <section>
      <MaxwidthContainer className="py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden">
            <Image
              src={product.src}
              alt={product.alt}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E290E]">
              {product.title}
            </h1>

            <div className="flex gap-2 items-center">
              <div>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 inline fill-[#50BB42] stroke-[#50BB42]"
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base font-bold">(92)</p>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {product.description}
            </p>

            <Button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-[#0E290E] text-white p-3 md:p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition text-sm sm:text-base"
            >
              Claim Deal
            </Button>
            <div>
                {product.details}
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                <h3 className="text-xl sm:text-2xl font-semibold">PROMOTIONS</h3>
                <div className="flex gap-3 sm:gap-4 items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-700 stroke-amber-700"/>
                    <p className="text-sm sm:text-base">Call 08037908384 To Place Your Order</p>
                </div>
                <div className="flex gap-3 sm:gap-4 items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-700 stroke-amber-700"/>
                    <p className="text-sm sm:text-base">Enjoy cheaper shipping fees</p>
                </div>
            </div>
          </div>
        </div>
      </MaxwidthContainer>
    </section>
  );
}