import { Card, CardContent, CardFooter } from "@/components/ui/card"
import MaxwidthContainer from "../sharing/maxwidth-container"
import { Button } from "../ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import { differentProducts } from "../constants/product"
import Link from "next/link"

export default function Dealsandoffers() {
  return (
    <section>
      <MaxwidthContainer className="py-10 md:py-16 lg:py-20 space-y-6 md:space-y-8 lg:space-y-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E290E]">
          Deals & Offers 
        </h2>
        
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-0">
          {differentProducts.map((item, index) => (
            <Link 
              key={index}
              href={`/deals/${item.title.toLowerCase().replace(/\s+/g, "-")}-${item.id}`}
              className="block flex-shrink-0"
            >
              <Card className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] cursor-pointer transition-transform hover:scale-105 hover:shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="space-y-3 p-4 md:p-6">
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
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"/>
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"/>
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"/>
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"/>
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 inline fill-[#50BB42] stroke-[#50BB42]"/>
                    </div>
                    <p className="text-sm sm:text-base font-bold">(92)</p>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 md:p-6 pt-0">
                  <Button className="w-full bg-[#0E290E] text-white p-3 md:p-4 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition text-sm sm:text-base">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </MaxwidthContainer>
    </section>
  )
}