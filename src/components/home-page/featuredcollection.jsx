import { Card, CardContent, CardFooter } from "@/components/ui/card"
import MaxwidthContainer from "../sharing/maxwidth-container"
import { Button } from "../ui/button"
import Image from "next/image"
import { differentProducts } from "../constants/product"
import { Star } from "lucide-react"
import Link from "next/link"

export default function Featuredcollection() {
  return (
    <section>
        <MaxwidthContainer className=" py-20 space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E290E]">
            Featured Collections/What's New 
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {differentProducts.map((item, index) => {
                return (
                    <Link 
                        key={index}
                          href={`/products/${item.title.toLowerCase().replace(/\s+/g, "-")}-${item.id}`}
                className= "block">
                    <Card key={index} className="w-fit">
                <CardContent className="space-y-1">
                    <div className="relative h-[300px] w-[250px] flex">
                        <Image 
                        src={item.src}
                         width={300}
                          height={200} 
                          alt={item.alt} 
                          className=" object-cover rounded-2xl"/>
                    </div>
                    <h3 className="text-lg font-semi-bold text-[#0E290E]">{item.title}</h3>
                    <p className="text-sm font-light">{item.description}</p>
                    <div className="flex gap-2 ">
                        <div>
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]"/>
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]"/>
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]"/>
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]"/>
                        <Star className="w-4 h-4 inline fill-[#50BB42] stroke-[#50BB42]"/>
                        </div>
                        <p>(172)</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-[#0E290E] text-white p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition">Add to Cart</Button>
                </CardFooter>
            </Card>
            </Link>
             );
          })}
        </div>
        </MaxwidthContainer>
    </section>

  )
}
