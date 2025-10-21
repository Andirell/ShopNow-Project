import Hero from '@/components/home-page/hero'
import Categorieslist from '@/components/home-page/categorieslist'
import Featuredcollection from '@/components/home-page/featuredcollection'
import Dealsandoffers from '@/components/home-page/dealsandoffers'
import CustomersFavorite from '@/components/home-page/customersfavorite'
import Services from '@/components/home-page/services'



export default function Home() {
  return (
    
    <main>
      <Hero />
      <Categorieslist />
      <Featuredcollection />
      <Dealsandoffers />
      <CustomersFavorite />
      <Services />
    </main>
  )
}
