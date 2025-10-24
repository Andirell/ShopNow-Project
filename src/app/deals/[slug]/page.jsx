"use client";
import { use } from "react";
import { useState } from "react";
import Image from "next/image";
import { differentProducts } from "@/components/constants/product";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function DealPage({ params }) {
  const { slug } = use(params);
  const differentProduct = differentProducts.find(
    (p) => p.id.toString() === slug.split("-").pop()
  );

  const [product] = useState(differentProduct);

  if (!product) {
    return (
      <MaxwidthContainer>
        <p className="text-center text-lg py-20">Product not found</p>
      </MaxwidthContainer>
    );
  }

  return (
    <section>
      <MaxwidthContainer className="py-12">
        <div className="flex md:flex justify-center gap-12 p-6 border border-amber-950 rounded-2xl">
                  <div>
                    <Image
                      src={product.src}
                      width={500}
                      height={500}
                      alt={product.alt}
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col w-120  px-6 py-4 gap-4 align-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl break-words text-[#3C1414]">
                      {product.title}
                    </h1>
                    <p className="">{product.description}</p>
                    <div className="flex gap-2 ">
                      <div>
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]" />
                      </div>
                      <p>(172)</p>
                    </div>
                    <h4 className="text-2xl">{product.price}</h4>
                    <Button className="bg-[#0E290E] text-white p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition">
                      Claim Deal
                    </Button>
                    <div>
                        {product.details}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-2xl font-semi-bold">PROMOTIONS</h3>
                        <div className="flex gap-4">
                            <Star className="fill-amber-700 stroke-amber-700"/>
                            <p>Call 08037908384 To Place Your Order</p>
                        </div>
                        <div className="flex gap-4">
                            <Star className="fill-amber-700 stroke-amber-700"/>
                            <p>Enjoy cheaper shipping fees</p>
                        </div>
                    </div>
                  </div>
                </div>
              </MaxwidthContainer>
    </section>
  );
}
