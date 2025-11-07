"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";

export default function ProductCard({ product }) {
  return (
    <section>
      <MaxwidthContainer>
        <Link
          href={`/products/${product.title
            .toLowerCase()
            .replace(/[\s]+/g, "-")}-${product.id}`}
        >
          <Card className="w-fit">
            <CardContent className="space-y-1">
              <div className="relative h-[300px] w-[250px] flex">
                <Image
                  src={product.src}
                  width={300}
                  height={200}
                  alt={product.alt}
                  className=" object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-lg font-semi-bold text-[#0E290E]">
                {product.title}
              </h3>
              <p className="text-sm font-light">{product.description}</p>
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
            </CardContent>
            <CardFooter>
              <Button className="bg-[#0E290E] w-full text-white p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </MaxwidthContainer>
    </section>
  );
}
