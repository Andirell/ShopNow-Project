"use client";

import ProductCard from "@/components/sharing/productcard";
import { differentProducts } from "@/components/constants/product";

export default function ProductsPage() {
  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">
        Explore Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
        {differentProducts.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
    </section>
  );
}
