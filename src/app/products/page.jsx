"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/sharing/productcard";
import { differentProducts } from "@/components/constants/product";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";



export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
const [filteredProducts, setFilteredProducts] = useState(differentProducts);
const [selectedCategory, setSelectedCategory] = useState("All");

const categories = [ "All", ...new Set(differentProducts.map((item) => item.category))];

   useEffect(() => {
    if (typeof window === "undefined"){
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
  }}, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(differentProducts);
    } else {
      const results = differentProducts.filter(
        (item) => item.category === category
      )
      setFilteredProducts(results);
    }};

  return (
    <section className="p-10">
      <MaxwidthContainer>
        <h1 className="text-3xl font-bold mb-8 text-[#0E290E]">
        Explore Our Products
      </h1>

      <div className="flex flex-wrap gap-4 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full border ${
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
};
