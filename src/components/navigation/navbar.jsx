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
  Menu,
  X,
} from "lucide-react";
import { Navs } from "../constants/datanav";
import { useCart } from "@/contexts/cartcontext";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="bg-[#0E290E] text-white flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-4 text-sm gap-2">
        <div className="flex gap-2 items-center justify-center sm:justify-start cursor-pointer">
          <Phone className="w-4 h-4 inline mr-2 ml-4" />
          <p>+2349057479783</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-center text-center text-[14px] cursor-pointer">
          <p>Free Delivery on Orders Over $50</p>
          <span className="hidden sm:inline">|</span>
          <p>Shop now</p>
        </div>
        <div className="hidden sm:flex items-center cursor-pointer">
          <p>English</p>
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
      </nav>

      <MaxwidthContainer className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 text-black relative">
        <div className="flex md:hidden justify-between w-full items-center">
          <Link href="/">
            <h1 className="text-[#0E290E] text-3xl font-bold text-center flex-1">
              ShopNow
            </h1>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6 text-[#0E290E]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0E290E]" />
            )}
          </button>
        </div>

        <div className="hidden md:flex lg:hidden justify-between w-full items-center">
          <div className="flex gap-3 items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#0E290E]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0E290E]" />
              )}
            </button>
            <Link href="/">
              <h1 className="text-[#0E290E] text-4xl font-bold">ShopNow</h1>
            </Link>
          </div>

          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center cursor-pointer">
              <CircleUser className="w-6 h-6 text-gray-600" />
              <p className="text-[15px]">Account</p>
            </div>
            <Link href="/cart" className="flex gap-2 items-center cursor-pointer relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <p className="text-[15px]">Cart</p>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0E290E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex justify-between items-center w-full">
          <div className="flex items-center gap-8">
            <Link href="/">
              <h1 className="text-[#0E290E] text-5xl font-bold">ShopNow</h1>
            </Link>
            <nav>
              <ul className="flex gap-6 text-lg font-medium">
                {Navs.map((link, index) => (
                  <li key={index}>
                    <Link href={`/${link.href}`}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex gap-8 items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/products?search=${searchTerm}`;
              }}
              className="flex items-center border py-2 px-4 rounded-3xl bg-[#e3dede] hover:shadow-md w-72"
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

            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center cursor-pointer">
                <CircleUser className="w-7 h-7 text-gray-600" />
                <p>Account</p>
              </div>
              <Link href="/cart" className="flex gap-2 items-center cursor-pointer relative">
                <ShoppingCart className="w-7 h-7 text-gray-600" />
                <p>Cart</p>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0E290E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-50 lg:hidden">
            <div className="flex flex-col items-center gap-4 py-6 text-lg font-medium text-[#0E290E]">
              {Navs.map((link, index) => (
                <Link
                  key={index}
                  href={`/${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#50BB42]"
                >
                  {link.title}
                </Link>
              ))}
              <div className="w-10/12 border-t my-2"></div>
              <Link
                href="/account"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <CircleUser className="w-5 h-5" />
                <p>Account</p>
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 relative"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <p>Cart</p>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0E290E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </MaxwidthContainer>
    </header>
  );
}