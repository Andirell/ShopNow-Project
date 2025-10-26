import MaxWidthContainer from "@/components/sharing/maxwidth-container";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section className="bg-[#F9FAF9] py-16">
      <MaxWidthContainer>
        <div className="space-y-16">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0E290E] mb-3">
                  Get in Touch with ShopNow
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  We are here to help with your orders, product inquiries, or
                  support needs. Reach us anytime — we will respond as quickly as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Call Us
                  </h3>
                  <p className="text-[#8BC34A] font-bold text-lg">
                    +234 905 747 9783
                  </p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Visit Our Store
                  </h3>
                  <p className="text-gray-600">
                    123 Tech Avenue,
                    <br />
                    Ikeja, Lagos, Nigeria.
                  </p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Email Support
                  </h3>
                  <p className="text-[#8BC34A] font-medium">
                    support@shopnow.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0E290E] mb-4">
              Contact Us
            </h1>
            <p className="text-center text-base md:text-lg text-gray-600 mb-8">
              Have questions, suggestions, or need support? We&apos;d love to
              hear from you. Fill out the form below and our team will get back
              to you as soon as possible.
            </p>

            <form
              action="https://formsubmit.co/andiudom274@gmail.com"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8BC34A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8BC34A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8BC34A]"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white py-6 rounded-xl font-semibold transition"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
