"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Support", href: "/support" },
  ];

  return (
    // <header className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/90 backdrop-blur-md shadow-md">
      <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.png" // replace with your actual logo path
        alt="AutoLog Logo"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
      <span className="text-xl font-bold hover:bg-[#ff2200]">AutoLog</span>
    </Link>

      {/* Desktop */}
      <nav className="hidden md:flex gap-8 text-gray-300">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="hover:bg-[#ff2200]">
            {link.name}
          </Link>
        ))}
        <button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
          Login
        </button>
      </nav>

      {/* Mobile */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#0B0F19] flex flex-col items-center gap-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
