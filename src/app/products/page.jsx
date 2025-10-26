"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/sharing/productcard";
import { differentProducts } from "@/components/constants/product";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
const [filteredProducts, setFilteredProducts] = useState(differentProducts);

   useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search")?.toLowerCase() || "";
    setSearchTerm(search);

     const results = differentProducts.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    setFilteredProducts(results);
  }, []);

  return (

    <section className="p-10">
      <MaxwidthContainer>
        <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">
        Explore Our Products
      </h1>
      
      {searchTerm && (
        <p className="mb-6 text-lg">
          Showing results for "<span className="font-semibold">{searchTerm}</span>"
        </p>
      )  
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
        {filteredProducts.length > 0 ? (filteredProducts.map((item, index) => (
          <ProductCard key={index} product={item} />
        )) 
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
      </MaxwidthContainer>
    </section>
  );
}
