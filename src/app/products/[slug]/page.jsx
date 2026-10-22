"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import AddToCart from "@/components/sharing/addtocart";
import { Star } from "lucide-react";
import { getProduct, formatPrice } from "@/lib/api";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(slug).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <MaxwidthContainer className="py-20">
        <p className="text-center text-gray-500">Loading...</p>
      </MaxwidthContainer>
    );
  }

  if (!product) {
    return (
      <MaxwidthContainer className="py-20">
        <p className="text-center text-lg">Product not found</p>
      </MaxwidthContainer>
    );
  }

  const outOfStock = product.stock === 0;

  return (
    <section>
      <MaxwidthContainer className="py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-4 sm:p-6 border border-amber-950 rounded-2xl">
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden">
              <Image src={product.src} alt={product.alt} fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 px-4 sm:px-6 py-4 gap-3 sm:gap-4 md:gap-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl break-words text-[#3C1414]">
              {product.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg">{product.description}</p>
            <div className="flex gap-2 items-center">
              <div>
                {[1, 2, 3, 4, 5].map((number) => (
                  <Star
                    key={number}
                    className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base font-bold">(172)</p>
            </div>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold">{formatPrice(product.price)}</h4>

            {/* stock is null when the products come from the local list */}
            {product.stock !== null && (
              <p className={outOfStock ? "text-red-600 font-semibold" : "text-gray-600"}>
                {outOfStock ? "Out of stock" : `${product.stock} in stock`}
              </p>
            )}

            {!outOfStock && <AddToCart product={product} className="w-full sm:w-auto" />}

            <div>{product.details}</div>
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h3 className="text-xl sm:text-2xl font-semibold">PROMOTIONS</h3>
              <div className="flex gap-3 sm:gap-4 items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-700 stroke-amber-700" />
                <p className="text-sm sm:text-base">Call 08037908384 To Place Your Order</p>
              </div>
              <div className="flex gap-3 sm:gap-4 items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-700 stroke-amber-700" />
                <p className="text-sm sm:text-base">Enjoy cheaper shipping fees</p>
              </div>
            </div>
          </div>
        </div>
      </MaxwidthContainer>
    </section>
  );
}
