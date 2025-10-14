import Link from 'next/link';
import MaxwidthContainer from '../sharing/maxwidth-container';
import { Button } from '../ui/button';
import { Navs } from '../constants/datanav';

export default function Navbar() {
  return (
    <header className="bg-yellow-400">
        <MaxwidthContainer className="flex md:justify-between items-center text-black py-8">
             <Link href="/">
          <h1 className=" text-black text-5xl cursor-pointer">My-App</h1>
        </Link>

        <nav className=''>
          <ul className="flex md:gap-20 text-lg font-medium">
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
        <div>
          <Button className='bg-black text-white hover:bg-gray-800 border-0'>Login</Button>
          <Button className='ml-4 bg-white text-black hover:bg-gray-200 border-0'>Sign Up</Button>
        </div>
        </MaxwidthContainer>
    </header>
  )
}
