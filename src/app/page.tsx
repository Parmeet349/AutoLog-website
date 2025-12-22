"use client";
import { joinWaitlist } from "../utils/actions"; // Import the action
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  CameraIcon,
  BellIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChartPieIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ChevronDownIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import { FaApple, FaAndroid } from "react-icons/fa";
import { getPlatform } from "../utils/getPlatform";

export default function Home() {
  const [platform, setPlatform] = useState("Unknown");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const handleWaitlist = async (formData: FormData) => {
    setIsSubmitting(true);
    const data = formData;
    data.set("source", platform);
    const result = await joinWaitlist(data);
    if (result.success) {
      setIsSubscribed(true);
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Where is my vehicle data stored?",
      a: "Your data is stored on your device and synced via an encrypted cloud connection. We use 256-bit encryption to ensure your service history is private."
    },
    {
      q: "Does AutoLog work offline?",
      a: "Yes. You can log services and expenses while offline. The app will automatically sync your data once you regain a connection."
    },
    {
      q: "Is my privacy protected?",
      a: "Privacy is our core pillar. We do not sell your driving habits or vehicle data to third-party marketers. Your garage is your business."
    }
  ];

  return (
    <div className="relative bg-[#030712] text-white overflow-hidden selection:bg-primary/30">

      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 40L40 40M40 0L40 40' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")` }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now Live • Smart Vehicle Logging
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                Your entire garage, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  perfectly logged.
                </span>
              </h1>

              <p className="text-xl text-slate-400 max-w-md leading-relaxed">
                AutoLog helps you organize fuel, maintenance, and expenses manually or with smart photo capture —
                so you always know what your vehicle really costs.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() => window.open(platform === "iOS" ? "https://apps.apple.com/us/app/autolog/id6446252256" : "https://play.google.com/store/apps/details?id=com.askstudios.autolog", "_blank")}
                  className="btn-premium flex items-center justify-center gap-2 group text-white">
                  Get Started for Free
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-6 px-6 py-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md grayscale opacity-60">
                  <FaApple onClick={() => window.open("https://apps.apple.com/us/app/autolog/id6446252256", "_blank")} className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                  <FaAndroid onClick={() => window.open("https://play.google.com/store/apps/details?id=com.askstudios.autolog", "_blank")} className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

            {/* Floating Phone Mockup */}
            {/* <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur opacity-25"></div>
              <div className="relative glass-card p-4 aspect-[9/19] max-w-[320px] mx-auto border-white/20 overflow-hidden shadow-2xl z-20">
                <div className="w-full h-full bg-[#0B0F19] rounded-[2rem] overflow-hidden p-6 border border-white/10">
                  <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
                  <div className="space-y-4">
                    <div className="h-24 w-full bg-primary/20 rounded-2xl animate-pulse" />
                    <div className="h-32 w-full bg-white/5 rounded-2xl" />
                  </div>
                </div>
              </div>
            </div> */}
            {/* Floating Phone Mockup */}
            <div className="relative group">
              {/* Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative glass-card p-3 aspect-[9/19] max-w-[320px] mx-auto border-white/20 overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 z-20">
                {/* The Phone Frame */}
                <div className="relative w-full h-full bg-[#0B0F19] rounded-[2rem] overflow-hidden border border-white/10">

                  {/* Your Actual App Screen */}
                  <Image
                    src="/images/app-screenshot.jpg" // Replace with your actual file in /public folder
                    alt="AutoLog App Dashboard"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {/* Hardware "Glass" Reflection Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />

                  {/* Dynamic Inner Shadow (makes the screen look inset) */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
                </div>
              </div>

              {/* Decorative Floating UI (Service Logged) */}
              <div className="absolute top-10 -right-4 glass-card p-4 flex gap-4 items-center animate-bounce duration-[3000ms] hidden md:flex z-30">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-bold">Service Logged</p>
                  <p className="text-[9px] text-slate-500">History updated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENTO FEATURES --- */}
        <section id="features" className="max-w-7xl mx-auto px-8 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Everyday Car Ownership</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">AutoLog brings everything about your vehicle into one clear, organized view.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
            <div className="glass-card md:col-span-2 md:row-span-2 p-10 flex flex-col justify-end relative overflow-hidden group">
              <CameraIcon className="absolute top-10 right-10 w-32 h-32 text-white/5 group-hover:text-primary/10 transition-colors" />
              <div className="relative z-10">
                <SparklesIcon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-4">Visual Records</h3>
                <p className="text-slate-400 max-w-sm text-lg leading-relaxed">Save time by capturing maintenance receipts with a photo. Your history stays complete and accurate.</p>
              </div>
            </div>
            <div className="glass-card p-8 flex flex-col justify-center text-center">
              <ChartPieIcon className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold">Ownership Insights</h3>
            </div>
            <div className="glass-card p-8 flex flex-col justify-center text-center">
              <BellIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold">Timely Reminders</h3>
            </div>
            <div className="glass-card md:col-span-1 p-8 flex flex-col justify-end">
              <ShieldCheckIcon className="w-8 h-8 mb-4 text-emerald-400" />
              <h3 className="text-xl font-bold mb-2">Privacy-First</h3>
            </div>
          </div>
        </section>

        {/* --- WAITLIST SECTION --- */}
        <section id="support" className="max-w-7xl mx-auto px-8 py-20">
          <div className="glass-card p-12 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold mb-4">Join the Inner Circle</h3>
              <p className="text-slate-400">Be the first to know about our upcoming Fuel Intelligence update and maintenance pro-tips.</p>
            </div>

            <div className="w-full max-w-sm">
              {isSubscribed ? (
                <div className="flex items-center gap-3 text-emerald-400 font-bold animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircleIcon className="w-8 h-8" />
                  You&apos;re on the list!
                </div>
              ) : (
                <form action={handleWaitlist} className="flex gap-2">
                  <div className="relative flex-1">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-light px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Joining..." : "Join"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="max-w-4xl mx-auto px-8 py-32">
          <h2 className="text-4xl font-bold text-center mb-16">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-slate-400 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}