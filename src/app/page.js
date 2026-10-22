import Hero from "@/components/home-page/hero";
import Categorieslist from "@/components/home-page/categorieslist";
import Featuredcollection from "@/components/home-page/featuredcollection";
import Dealsandoffers from "@/components/home-page/dealsandoffers";
import CustomersFavorite from "@/components/home-page/customersfavorite";
import Services from "@/components/home-page/services";
import { getProducts } from "@/lib/api";

export default async function Home() {
  // Load the products once here and pass them to each section
  const products = await getProducts();

  return (
    <main>
      <Hero />
      <Categorieslist />
      <Featuredcollection products={products} />
      <Dealsandoffers products={products} />
      <CustomersFavorite products={products} />
      <Services />
    </main>
  );
}
