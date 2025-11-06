import MaxwidthContainer from "../sharing/maxwidth-container";
import { Categories } from "../constants/datacategories";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Categorieslist() {
  return (
    <section>
      <MaxwidthContainer className=" py-20 space-y-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E290E] text-center md:text-left">
          Top Categories To Explore
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 md:px-0">
      
          {Categories.map((category, index) => {
            return (
              <Link 
               key={index}
                href={`/products?category=${encodeURIComponent(category.title)}`}
                className= "block flex-shrink-0">
              <Card className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[330px] cursor-pointer transition-transform hover:scale-105 hover:shadow-lg rounded-2xl">
                <CardContent className="text-2xl text-center font-semibold space-y-4 p-4 ">
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[320px] flex">
                    <Image
                      src={category.src}
                      width={300}
                      height={200}
                      alt={category.alt}
                      className=" object-cover rounded-2xl"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semi-bold text-[#0E290E]">
                    {category.title}
                  </h3>
                  <p className="text-[14px] sm:text-sm font-light">{category.description}</p>
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
