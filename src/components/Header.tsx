"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Stats", href: "#stats" },
    { name: "Pricing", href: "#pricing" },
    { name: "Support", href: "#support" },
  ];

  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/90 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="AutoLog Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold cursor-pointer text-white">
            AutoLog
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-gray-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-[#FF6600] transition"
            >
              {link.name}
            </button>
          ))}
          <button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
            Login
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6 text-white" />
            ) : (
              <HiMenu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-[#0B0F19] shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AutoLog Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="text-xl font-bold text-white">AutoLog</span>
          </Link>
          <button onClick={toggleMobileMenu}>
            <HiX className="w-6 h-6 text-white" />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className="text-gray-300 text-lg hover:text-[#ff6600] w-full text-left"
              >
                {link.name}
              </button>
            </li>
          ))}
          <li className="mt-4">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 w-full">
              Login
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
