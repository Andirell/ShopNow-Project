"use client";

import React from "react";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { differentProducts } from "@/components/constants/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export default function Deals() {
  return (
    <section>
      <MaxwidthContainer className="py-10 md:py-16 lg:py-20 space-y-6 md:space-y-8 lg:space-y-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E290E]">
          Deals & Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {differentProducts.map((item) => {
            const slug = `${item.title
              .toLowerCase()
              .replace(/[\s]+/g, "-")}-${item.id}`;

            return (
              <Card key={item.id} className="w-full overflow-hidden">
                <Link href={`/deals/${slug}`}>
                  <CardContent className="space-y-3 p-4 md:p-6 cursor-pointer">
                    <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-xl overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0E290E]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-light text-gray-600 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex gap-2 items-center">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"
                          />
                        ))}
                      </div>
                      <p className="text-sm sm:text-base font-bold">(92)</p>
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="p-4 md:p-6 pt-0">
                  <Button className="w-full bg-[#0E290E] text-white p-3 md:p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition text-sm sm:text-base">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </MaxwidthContainer>
    </section>
  );
}