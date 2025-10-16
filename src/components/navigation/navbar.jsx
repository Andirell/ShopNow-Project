import Link from 'next/link';
import MaxwidthContainer from '../sharing/maxwidth-container';
import {Search, CircleUser, ShoppingCart, Phone, ChevronDown } from 'lucide-react';
import { Navs } from '../constants/datanav';

export default function Navbar() {
  return (
    <header className="bg-[white]">
        <nav className='bg-[#0E290E] text-white flex md:justify-between py-3 px-3 items-center gap-16 '>
            <div className='flex gap-2 items-center cursor-pointer'>
              <Phone className='w-6 h-6 inline mr-2 ml-4'/>
              <p>+2349057479783</p>
            </div>
            <div className='flex gap-4 items-center cursor-pointer'>
              <p className=''>Free Delivery on Orders Over $50</p>
              <p>I</p>
              <p>Shop now</p>
            </div>
            <div className='flex items-center cursor-pointer'>
              <p>English</p>
              <ChevronDown className='w-4 h-4 inline ml-1'/>
            </div>
        </nav>
        <MaxwidthContainer className="flex md:justify-between items-center text-black py-4">
             <Link href="/">
          <h1 className=" text-[#0E290E] text-5xl cursor-pointer">ShopNow</h1>
        </Link>

        <nav className=''>
          <ul className="flex md:gap-12 text-lg font-medium">
            {Navs.map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    href={`/${link.href}`}>
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='flex gap-20 items-center cursor-pointer border py-2 px-4 rounded-3xl bg-[#e3dede]  hover:shadow-md'>
          <p className='text-gray-400 text-sm'>Search Product</p>
          <Search className='w-6 h-6 text-gray-400 cursor-pointer'/>
        </div>
        <div className='flex gap-8'>
             <div className='flex gap-2 items-center cursor-pointer'>
                <CircleUser className='w-8 h-8 text-gray-600 cursor-pointer'/>
                <p>Account</p>
             </div>
              <div className='flex gap-2 items-center cursor-pointer'>
                <ShoppingCart className='w-8 h-8 text-gray-600 cursor-pointer'/>
                <p>Cart</p>
              </div>
        </div>
        </MaxwidthContainer>
    </header>
  )
}
