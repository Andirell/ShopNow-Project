"use client";
import Image from "next/image";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";


export default function About() {
  return (
    <section className="py-20 bg-gray-50 text-gray-800">
      <MaxwidthContainer className="grid md:grid-cols-2 gap-12 items-center px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            About <span className="text-[#0E290E]">ShopNow</span>
          </h1>
          <h2 className="text-lg font-semibold text-gray-600 mb-6">
            Redefining the way you discover and shop for gadgets.
          </h2>
          <p className="leading-relaxed text-gray-700 mb-4">
            Welcome to <strong>ShopNow</strong>, your trusted hub for the latest and greatest in tech.
            We believe gadgets are not just tools — they are the heartbeat of modern life.
          </p>
          <p className="leading-relaxed text-gray-700 mb-4">
            From smartwatches and wireless earbuds to high-performance laptops and home
            tech essentials, ShopNow brings innovation right to your fingertips.
          </p>
          <p className="leading-relaxed text-gray-700 mb-4">
            Founded with a mission to make technology more accessible, we carefully
            curate products from top global brands and emerging creators alike.
          </p>
          <p className="leading-relaxed text-gray-700 mb-6">
            At ShopNow, we are not just selling gadgets — we are helping you stay
            connected, productive, and inspired in a fast-moving world.
          </p>
          <p className="text-[#0E290E] font-semibold italic">
            💡 Shop smart. Shop better. ShopNow.
          </p>
        </div>

        <div className="relative h-[500px] w-[600px] flex">
          <Image
            src="https://res.cloudinary.com/dxekfksjf/image/upload/v1761142944/modern-workspace-setup-stockcake_kespi7.jpg"
            alt="Modern gadgets arranged neatly on a workspace desk"
            height={600}
            width={600}
  
            className="object-cover rounded-2xl "
          />
        </div>
      </MaxwidthContainer>
    </section>
  );
}
