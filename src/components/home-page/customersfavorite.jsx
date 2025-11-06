import { Card, CardContent, CardFooter } from "@/components/ui/card"
import MaxwidthContainer from "../sharing/maxwidth-container"
import { Button } from "../ui/button"
import Image from "next/image"
import { Star } from "lucide-react"
import { differentProducts } from "../constants/product"
import Link from "next/link"

export default function CustomersFavorite() {
  return (
    <section>
        <MaxwidthContainer className=" py-20 space-y-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E290E] text-center md:text-left">
            Customers' Favorites
        </h2>
        <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto 
        scrollbar-hide px-2 md:px-0">
            {differentProducts.map((item, index) => {
                return (
                    <Link 
                        key={index}
                          href={`/products/${item.title.toLowerCase().replace(/\s+/g, "-")}-${item.id}`}
                className= "block flex-shrink-0 md:flex-shrink md:w-auto">
                    <Card key={index} className="w-[230px] sm:w-[250px] md:w-full cursor-pointer transition-transform hover:scale-105 hover:shadow-lg rounded-2xl">
                <CardContent className="space-y-2 p-4">
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
                        <p>(273)</p>
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
