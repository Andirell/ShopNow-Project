"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/sharing/addtocart";

export default function ProductCard({ product }) {


  return (
    <Card className="w-fit">
      <Link href={`/products/${product.title.toLowerCase().replace(/\s+/g, "-")}-${product.id}`}>
        <CardContent className="space-y-1">
          <div className="relative h-[300px] w-[250px]">
            <Image
              src={product.src}
              width={300}
              height={200}
              alt={product.alt}
              className="object-cover rounded-2xl"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#0E290E] mt-2">{product.title}</h3>
          <p className="text-sm font-light">{product.description}</p>
          <div className="flex gap-2 items-center">
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
      </Link>
      <CardFooter>
    <AddToCart product={product} className="w-full" />
</CardFooter>
    </Card>
  );
}