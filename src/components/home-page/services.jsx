import MaxwidthContainer from "../sharing/maxwidth-container";
import Image from "next/image";

export default function Services() {
  return (
    <section>
      <MaxwidthContainer className="py-10 md:py-16 lg:py-20 space-y-6 md:space-y-8 lg:space-y-10"> 
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E290E] text-center md:text-left">
          Services To Help You Shop
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 border border-gray-300 rounded-lg p-4 md:p-6 lg:p-8">
          
         
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760969602/WhatsApp_Image_2025-10-20_at_15.11.12_65151037_wdrq8p.jpg" 
                alt="A lady asking questions"
                fill
                className="object-cover"
              />
            </div>
            <h5 className="text-base md:text-lg lg:text-xl font-bold text-[#0E290E]">
              Frequently Asked Questions
            </h5>
            <p className="text-xs md:text-sm lg:text-base font-light text-gray-600">
              Find answers to common questions about orders, shipping, and more.
            </p>
          </div>

        
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760969599/WhatsApp_Image_2025-10-20_at_15.11.11_24040e9a_o0qdcj.jpg" 
                alt="Pos payment"
                fill
                className="object-cover"
              />
            </div>
            <h5 className="text-base md:text-lg lg:text-xl font-bold text-[#0E290E]">
              Online Payment Process
            </h5>
            <p className="text-xs md:text-sm lg:text-base font-light text-gray-600">
              Learn about our secure online payment methods and options.
            </p>
          </div>

         
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative w-full h-[200px] md:h-[220px] lg:h-[240px] rounded-xl overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760969599/WhatsApp_Image_2025-10-20_at_15.11.11_f5301d8a_wpfyz7.jpg" 
                alt="A man carrying a box"
                fill
                className="object-cover"
              />
            </div>
            <h5 className="text-base md:text-lg lg:text-xl font-bold text-[#0E290E]">
              Home Delivery Options
            </h5>
            <p className="text-xs md:text-sm lg:text-base font-light text-gray-600">
              Explore our various home delivery services to suit your needs.
            </p>
          </div>
          
        </div>
      </MaxwidthContainer>
    </section>
  );
}