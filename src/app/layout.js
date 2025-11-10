import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { CartProvider } from "@/contexts/cartcontext";



const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "My E-commerce App ",
  description: "Created by DevAndi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${urbanist.className}  } antialiased`} >

        <CartProvider>
          < Navbar />
          {children}
          < Footer />
        </CartProvider>
      </body>
    </html>
  );
}
