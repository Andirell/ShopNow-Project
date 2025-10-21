"use client";
import Image from "next/image";
import React from "react";
import MaxWidthContainer from "@/components/things-to-share/max-width-container";

export default function About() {
  return (
    <section className="py-20 bg-gray-50 text-gray-800">
      <MaxWidthContainer className="grid md:grid-cols-2 gap-12 items-center px-4">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            About <span className="text-blue-600">ShopNow</span>
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
          <p className="text-blue-600 font-semibold italic">
            💡 Shop smart. Shop better. ShopNow.
          </p>
        </div>

        <div className="relative h-[400px] w-full">
          <Image
            src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760551754/about_gadgets_image.png"
            alt="Modern gadgets arranged neatly on a workspace desk"
            fill
            className="object-cover rounded-2xl shadow-md"
          />
        </div>
      </MaxWidthContainer>
    </section>
  );
}
