"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/sharing/productcard";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { getProducts } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Read ?search= and ?category= from the address bar (the navbar search
    // and the home page category cards link here with them)
    const params = new URLSearchParams(window.location.search);
    setSearchTerm((params.get("search") || "").toLowerCase());
    setSelectedCategory(params.get("category") || "All");

    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = ["All"];
  for (const product of products) {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  }

  let filteredProducts = products;
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
  }
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter((item) => item.category === selectedCategory);
  }

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10">
      <MaxwidthContainer>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-[#0E290E]">
          Explore Our Products
        </h1>

        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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
            Showing results for &quot;<span className="font-semibold">{searchTerm}</span>&quot;{" "}
            <button onClick={() => setSearchTerm("")} className="text-sm underline text-[#0E290E] ml-2">
              Clear search
            </button>
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => <ProductCard key={item.id} product={item} />)
            ) : (
              <div className="col-span-full text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No products found.</p>
              </div>
            )}
          </div>
        )}
      </MaxwidthContainer>
    </section>
  );
}
