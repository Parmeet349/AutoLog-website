"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { getPlatform } from "../utils/getPlatform";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState("Unknown");

  useEffect(() => {
    setPlatform(getPlatform());

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleGetApp = () => {
    window.open(
      platform === "iOS" || platform === "Mac"
        ? "https://apps.apple.com/us/app/autolog-vehicle-manager/id6757113052"
        : "https://play.google.com/store/apps/details?id=com.parmeet.AutoLog",
      "_blank"
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300
      ${isScrolled
          ? "py-4 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5"
          : "py-8 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            priority
            alt="AutoLog"
            width={40}
            height={40}
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">
            AutoLog
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={handleGetApp}
            className="btn-premium flex items-center gap-2 text-white group"
          >
            Get Started
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#030712] border-b border-white/5 p-8 flex flex-col gap-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={handleGetApp}
            className="btn-premium mt-4 flex items-center justify-center gap-2"
          >
            Start Logging for Free
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
}
