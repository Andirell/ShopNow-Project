import MaxwidthContainer from "../sharing/maxwidth-container";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#EBD293]">
      <MaxwidthContainer className=" py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6 p-4">
          <div className="w-full md:w-1/2 flex flex-col justify-center md:items-start lg:items-start items-center text-center md:text-left px-6 md:px-6 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E290E] mb-6">
              Welcome to ShopNow
            </h1>
            <p className=" text-base sm:text-lg text-[#0E290E] mb-6">
              Discover the best products at unbeatable prices. Shop now and
              experience the difference!
            </p>
            <Link href="/products" className="w-full sm:w-auto">
                <Button className="bg-[#0E290E] text-white items-center p-6 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition">
                    Explore Deals
                </Button>
            
            </Link>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760551754/unsplash_gOe4rbB8K6U_kux3nl.png"
              alt=" A walk-in store"
            />
          </div>
        </div>
      </MaxwidthContainer>
    </section>
  );
}
