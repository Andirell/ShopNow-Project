"use client";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0E290E] text-gray-300 py-10 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopNow</h2>
          <p className="text-sm leading-relaxed mb-4">
            Your one-stop shop for the latest gadgets and electronics.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-500">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-pink-500">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-red-500">
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-white">What's New</Link></li>
            <li><Link href="#" className="hover:text-white">Deals & Offers</Link></li>
            <li><Link href="#" className="hover:text-white">Customer's Favorite</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-white">Help Center</Link></li>
            <li><Link href="#" className="hover:text-white">Track Order</Link></li>
            <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} ShopNow. All rights reserved.</p>
      </div>
    </footer>
  );
}
