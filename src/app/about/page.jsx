"use client";
import Image from "next/image";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";

export default function About() {
  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gray-50 text-gray-800">
      <MaxwidthContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            About <span className="text-[#0E290E]">ShopNow</span>
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-4 sm:mb-6">
            Redefining the way you discover and shop for gadgets.
          </h2>
          <p className="leading-relaxed text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
            Welcome to <strong>ShopNow</strong>, your trusted hub for the latest and greatest in tech.
            We believe gadgets are not just tools — they are the heartbeat of modern life.
          </p>
          <p className="leading-relaxed text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
            From smartwatches and wireless earbuds to high-performance laptops and home
            tech essentials, ShopNow brings innovation right to your fingertips.
          </p>
          <p className="leading-relaxed text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
            Founded with a mission to make technology more accessible, we carefully
            curate products from top global brands and emerging creators alike.
          </p>
          <p className="leading-relaxed text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            At ShopNow, we are not just selling gadgets — we are helping you stay
            connected, productive, and inspired in a fast-moving world.
          </p>
          <p className="text-[#0E290E] font-semibold italic text-sm sm:text-base">
            💡 Shop smart. Shop better. ShopNow.
          </p>
        </div>

        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dxekfksjf/image/upload/v1761142944/modern-workspace-setup-stockcake_kespi7.jpg"
            alt="Modern gadgets arranged neatly on a workspace desk"
            fill
            className="object-cover"
          />
        </div>
      </MaxwidthContainer>
    </section>
  );
}