import MaxwidthContainer from "../sharing/maxwidth-container";
import { Categories } from "../constants/datacategories";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Categorieslist() {
  return (
    <section>
      <MaxwidthContainer className=" py-20 space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E290E]">
          Top Categories To Explore
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
      
          {Categories.map((category, index) => {
            return (
              <Link 
               key={index}
                href={`/products?category=${encodeURIComponent(category.title)}`}
                className= "block">
              <Card className="w-fit cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
                <CardContent className="text-2xl font-semibold space-y-4 ">
                  <div className="relative h-[300px] w-[250px] flex">
                    <Image
                      src={category.src}
                      width={300}
                      height={200}
                      alt={category.alt}
                      className=" object-cover rounded-2xl"
                    />
                  </div>
                  <h3 className="text-lg font-semi-bold text-[#0E290E]">
                    {category.title}
                  </h3>
                  <p className="text-sm font-light">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
            );
          })}
        </div>
      </MaxwidthContainer>
    </section>
  );
}
