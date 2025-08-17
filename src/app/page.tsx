"use client";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import { FaApple, FaAndroid } from "react-icons/fa";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showTopButton, setShowTopButton] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const [stats, setStats] = useState({ cars: 0, logs: 0, users: 0 });

  const sections = ["hero", "features", "stats", "pricing", "support"];
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll & parallax handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) setActiveSection(id);
      });
      setShowTopButton(window.scrollY > 500);
      setScrollY(window.scrollY);

      const statsEl = document.getElementById("stats");
      if (statsEl && window.scrollY + window.innerHeight >= statsEl.offsetTop) {
        setCountersStarted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    if (!countersStarted) return;
    const interval = setInterval(() => {
      setStats((prev) => ({
        cars: prev.cars < 1200 ? prev.cars + 10 : 1200,
        logs: prev.logs < 3500 ? prev.logs + 25 : 3500,
        users: prev.users < 5000 ? prev.users + 40 : 5000,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [countersStarted]);

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      revealRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <main className="bg-[#0B0F19] text-white min-h-screen relative overflow-x-hidden">

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-32 gap-12 scroll-mt-32 overflow-hidden"
        ref={addRef}
      >
        
        <Image
            src="/mockup-phone.png" // replace with your actual phone mockup
            alt="App mockup"
            width={350}
            height={700}
            className="rounded-lg"
          />
        <div className="max-w-lg">
          <h2 className="text-4xl font-extrabold mb-4">
            Track Your Car Expenses Effortlessly
          </h2>
          <p className="text-gray-400 mb-6">
            AutoLog helps you monitor fuel costs, maintenance, and other vehicle
            expenses with ease. Download now to start saving.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#ff6600] hover:bg-[#ff2200] px-6 py-3 rounded-md font-medium">
              Download for iOS
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md font-medium">
              Download for Android
            </button>
          </div>
        </div>
        <div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-16 scroll-mt-32">
        <h3 className="text-3xl font-bold mb-8">Key Features</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { title: "OCR Fuel Log", desc: "Scan receipts with OCR technology.", img: "/ocr.png" },
            { title: "Dashboard Charts", desc: "Visualize spending with charts.", img: "/charts.png" },
            { title: "Reminders", desc: "Set maintenance & insurance reminders.", img: "/reminders.png" },
            { title: "Multi-Vehicle Support", desc: "Manage multiple vehicles.", img: "/multi-vehicle.png" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-6 rounded-lg hover:shadow-xl hover:scale-105 transition transform opacity-0 translate-y-10"
              ref={addRef}
            >
              <Image src={feature.img} alt={feature.title} width={400} height={200} className="rounded-md mb-4"/>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="max-w-7xl mx-auto px-8 py-16 scroll-mt-32 flex flex-col items-center text-center">
        <div className="flex justify-around w-full mb-12">
          <div>
            <h4 className="text-4xl font-bold text-[#ff6600]">{stats.cars}+</h4>
            <p className="text-gray-400">Cars Tracked</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-[#ff6600]">{stats.logs}+</h4>
            <p className="text-gray-400">Fuel Logs</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-[#ff6600]">{stats.users}+</h4>
            <p className="text-gray-400">Active Users</p>
          </div>
        </div>

        {/* Download Buttons Below Stats */}
        <div className="flex gap-6">
          <button className="bg-[#ff6600] hover:bg-[#ff2200] px-6 py-3 rounded-md font-medium flex items-center gap-2 transition transform hover:scale-105">
            <FaApple /> iOS Download
          </button>
          <button className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-md font-medium flex items-center gap-2 transition transform hover:scale-105">
            <FaAndroid /> Android Download
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-8 py-16 scroll-mt-32">
        <h3 className="text-3xl font-bold mb-12 text-center">Pricing Plans</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Free", price: "$0/month", features: ["Basic fuel tracking", "Trip logs"] },
            { title: "Premium", price: "$9.99/month", features: ["Unlimited tracking", "Maintenance reminders", "Advanced analytics"] },
          ].map((plan, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-8 rounded-lg hover:shadow-xl hover:scale-105 transition transform opacity-0 translate-y-10"
              ref={addRef}
            >
              <h4 className="text-2xl font-semibold mb-4">{plan.title}</h4>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-6 space-y-2 text-gray-400">
                {plan.features.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>
              <button className="bg-[#ff6600] px-6 py-3 rounded-md hover:bg-[#ff2200] font-medium transition transform hover:scale-105">Choose Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="max-w-7xl mx-auto px-8 py-16 scroll-mt-32">
        <h3 className="text-3xl font-bold mb-12 text-center">Support & FAQs</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { q: "How do I log fuel expenses?", a: "Scan receipts or enter manually using AutoLog." },
            { q: "Can I track multiple vehicles?", a: "Yes, you can manage multiple vehicles." },
            { q: "How do I upgrade to Premium?", a: "Visit the Pricing section and select Premium." },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-6 rounded-lg hover:shadow-xl hover:scale-105 transition transform opacity-0 translate-y-10"
              ref={addRef}
            >
              <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={() => scrollTo("hero")}
          className="fixed bottom-8 right-8 bg-[#ff6600] text-white p-4 rounded-full shadow-lg hover:bg-[#ff2200] transition transform hover:scale-110 z-50"
        >
          ↑
        </button>
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <p>© 2023 AutoLog. All rights reserved.</p>
      </footer>
    </main>
  );
}
