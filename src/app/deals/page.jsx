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
      <MaxwidthContainer className="py-20 space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E290E]">
          Deals & Offers
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {differentProducts.map((item) => {
            const slug = `${item.title
              .toLowerCase()
              .replace(/[\s]+/g, "-")}-${item.id}`;

            return (
              <Card key={item.id} className="w-fit">
                <Link href={`/deals/${slug}`}>
                  <CardContent className="space-y-1 cursor-pointer">
                    <div className="relative h-[300px] w-[250px] flex">
                      <Image
                        src={item.src}
                        width={300}
                        height={200}
                        alt={item.alt}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0E290E]">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light">{item.description}</p>

                    <div className="flex gap-2">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]"
                          />
                        ))}
                      </div>
                      <p>(92)</p>
                    </div>
                  </CardContent>
                </Link>

                <CardFooter>
                  <Button className="bg-[#0E290E] text-white p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition">
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
