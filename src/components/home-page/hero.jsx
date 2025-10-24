import MaxwidthContainer from "../sharing/maxwidth-container";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#EBD293]">
      <MaxwidthContainer className=" py-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-[500px] flex flex-col justify-center gap-2 items-start p-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0E290E] mb-6">
              Welcome to ShopNow
            </h1>
            <p className="text-lg text-[#0E290E] mb-6">
              Discover the best products at unbeatable prices. Shop now and
              experience the difference!
            </p>
            <Link href="/products">
                <Button className="bg-[#0E290E] text-white p-6 rounded-3xl cursor-pointer hover:bg-[#0c230c] transition">
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
