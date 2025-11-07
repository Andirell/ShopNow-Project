"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/sharing/productcard";
import { differentProducts } from "@/components/constants/product";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(differentProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(differentProducts.map((item) => item.category))];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search")?.toLowerCase() || "";
      const category = params.get("category") || "All";

      setSearchTerm(search);
      setSelectedCategory(category);
       
      let results = differentProducts;

      if (search) {
        results = results.filter((item) =>
          item.title.toLowerCase().includes(search)
        );
      }

      if (category !== "All") {
        results = results.filter((item) => item.category === category);
      }
      setFilteredProducts(results);
    }
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(differentProducts);
    } else {
      const results = differentProducts.filter(
        (item) => item.category === category
      );
      setFilteredProducts(results);
    }
  };

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10">
      <MaxwidthContainer>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-[#0E290E]">
          Explore Our Products
        </h1>

        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 sm:px-4 md:px-5 py-2 rounded-full border text-sm sm:text-base ${
                selectedCategory === category
                  ? "bg-[#0E290E] text-white"
                  : "bg-white text-[#0E290E] border-[#0E290E] hover:bg-[#e6efe6]"
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>
      
        {searchTerm && (
          <p className="mb-4 sm:mb-6 text-base sm:text-lg">
            Showing results for "<span className="font-semibold">{searchTerm}</span>"
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No products found.
              </p>
            </div>
          )}
        </div>
      </MaxwidthContainer>
    </section>
  );
}