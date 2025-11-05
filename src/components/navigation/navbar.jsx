"use client";
import { useState } from "react";
import Link from "next/link";
import MaxwidthContainer from "../sharing/maxwidth-container";
import {
  Search,
  CircleUser,
  ShoppingCart,
  Phone,
  ChevronDown,
} from "lucide-react";
import { Navs } from "../constants/datanav";

export default function Navbar() {
const [searchTerm, setSearchTerm] = useState("");


  return (
    <header className="bg-[white]">
      <nav className="bg-[#0E290E] text-white flex md:justify-between py-3 px-3 items-center gap-16 ">
        <div className="flex gap-2 items-center cursor-pointer">
          <Phone className="w-6 h-6 inline mr-2 ml-4" />
          <p>+2349057479783</p>
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <p className="">Free Delivery on Orders Over $50</p>
          <p>I</p>
          <p>Shop now</p>
        </div>
        <div className="flex items-center cursor-pointer">
          <p>English</p>
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
      </nav>
      <MaxwidthContainer className="flex md:justify-between items-center text-black py-4">
        <div className="flex gap-8 items-center">
          <Link href="/">
            <h1 className=" text-[#0E290E] text-5xl cursor-pointer">ShopNow</h1>
          </Link>

          <nav className="">
            <ul className="flex md:gap-6 text-lg font-medium">
              {Navs.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={`/${link.href}`}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex gap-8">
          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              window.location.href = `/products?search=${searchTerm}`;
            }}
            className="flex items-center border py-2 px-4 rounded-3xl bg-[#e3dede] hover:shadow-md w-full sm:w-1/2"
          >
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
            />
            <button type="submit">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </form>
          
          <div className="flex gap-8">
            <div className="flex gap-2 items-center cursor-pointer">
              <CircleUser className="w-8 h-8 text-gray-600 cursor-pointer" />
              <p>Account</p>
            </div>
            <Link href={"/cart"} className="flex gap-2 items-center cursor-pointer">
              <ShoppingCart className="w-8 h-8 text-gray-600 cursor-pointer" />
              <p>Cart</p>
            </Link>
          </div>
        </div>
      </MaxwidthContainer>
    </header>
  );
}
