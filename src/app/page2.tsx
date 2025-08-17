// app/page.tsx
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="bg-[#0B0F19] text-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">AutoLog</h1>
        <nav className="hidden md:flex gap-8 text-gray-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#support" className="hover:text-white">Support</a>
          <button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
            Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 gap-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-extrabold mb-4">
            Track Your Car Expenses Effortlessly
          </h2>
          <p className="text-gray-400 mb-6">
            AutoLog helps you monitor fuel costs, maintenance, and other vehicle
            expenses with ease. Download now to start saving.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-md font-medium">
              Download for iOS
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md font-medium">
              Download for Android
            </button>
          </div>
        </div>
        <div>
          <Image
            src="/mockup-phone.png" // replace with your actual phone mockup
            alt="App mockup"
            width={350}
            height={700}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-16">
        <h3 className="text-3xl font-bold mb-8">Key Features</h3>
        <p className="text-gray-400 mb-12">
          AutoLog offers a range of features to help you manage your car
          expenses effectively.
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              title: "OCR Fuel Log",
              desc: "Easily log fuel expenses by scanning receipts with OCR technology.",
              img: "/ocr.png",
            },
            {
              title: "Dashboard Charts",
              desc: "Visualize your spending with interactive charts and graphs.",
              img: "/charts.png",
            },
            {
              title: "Reminders",
              desc: "Set reminders for maintenance, insurance, and other important dates.",
              img: "/reminders.png",
            },
            {
              title: "Multi-Vehicle Support",
              desc: "Manage expenses for multiple vehicles in one place.",
              img: "/multi-vehicle.png",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#111827] p-6 rounded-lg hover:shadow-lg transition"
            >
              <Image
                src={feature.img}
                alt={feature.title}
                width={400}
                height={200}
                className="rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#111827] py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h3 className="text-3xl font-bold mb-8">Benefits</h3>
          <p className="text-gray-400 mb-12">
            Discover how AutoLog can help you save money and stay organized.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Save Money",
                desc: "Identify areas where you can reduce spending on your vehicle.",
              },
              {
                title: "Track Expenses",
                desc: "Keep a detailed record of all your car-related expenses.",
              },
              {
                title: "Stay Organized",
                desc: "Never miss a maintenance appointment or renewal date with timely reminders.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-[#0B0F19] p-6 rounded-lg hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-md font-medium inline-flex items-center">
            Download AutoLog Now
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-6 flex justify-between text-gray-400 text-sm">
        <div className="flex gap-6">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <p>© 2023 AutoLog. All rights reserved.</p>
      </footer>
    </main>
  );
}
