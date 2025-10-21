import MaxwidthContainer from "../sharing/maxwidth-container";
import Image from "next/image";

export default function Services() {
  return (
    <section>
      <MaxwidthContainer className=" py-10 space-y-8"> 
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E290E]">Services To Help You Shop</h2>
        <div className="flex border border-gray-300 rounded-lg p-6 gap-8 space-y-2">
          <div className="flex flex-col gap-4 ">
            <div>
              <Image src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760969602/WhatsApp_Image_2025-10-20_at_15.11.12_65151037_wdrq8p.jpg" 
              alt="A lady asking questions"
              width={300}
              height={200} 
              className=" object-cover rounded-2xl" />
            </div>
            <h5 className="text-lg font-bold text-[#0E290E]">Frequently Asked Questions</h5>
            <p className="text-sm font-light">
              Find answers to common questions about orders, shipping, and more.
            </p>
          </div>
          <div className="flex flex-col gap-4 ">
            <div>
              <Image src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760969599/WhatsApp_Image_2025-10-20_at_15.11.11_24040e9a_o0qdcj.jpg" 
              alt="Pos payment"
              width={300}
              height={200} 
              className=" object-cover rounded-2xl"/>
            </div>
            <h5 className="text-lg font-bold text-[#0E290E]">Online Payment Process</h5>
            <p className="text-sm font-light">Learn about our secure online payment methods and options.</p>
          </div>
          <div className="flex flex-col gap-4 ">
            <div>
              <Image src="https://res.cloudinary.com/dxekfksjf/image/upload/v1760969599/WhatsApp_Image_2025-10-20_at_15.11.11_f5301d8a_wpfyz7.jpg" 
              alt=" A man carrying a box"
              width={300}
              height={200} 
              className=" object-cover rounded-2xl" />
            </div>
            <h5 className="text-lg font-bold text-[#0E290E]">Home Delivery Options</h5>
            <p className="text-sm font-light">
              Explore our various home delivery services to suit your needs.
            </p>
          </div>
        </div>
      </MaxwidthContainer>
    </section>
  );
}
