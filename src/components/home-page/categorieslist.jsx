import MaxwidthContainer from "../sharing/maxwidth-container";
import { Categories } from "../constants/datacategories";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

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
              <Card key={index} className="w-fit">
                <CardContent className="text-2xl font-semibold space-y-4 ">
                  <div className="relative h-[300px] w-[250px] flex">
                    <Image
                      src={category.src}
                      width={300}
                      height={200}
                      alt="Computer"
                      className=" object-cover rounded-2xl"
                    />
                  </div>
                  <h3 className="text-lg font-semi-bold text-[#0E290E]">
                    {category.title}
                  </h3>
                  <p className="text-sm font-light">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </MaxwidthContainer>
    </section>
  );
}
