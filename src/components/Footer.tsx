import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between text-gray-400 text-sm mt-16">
      <div className="flex gap-6 mb-4 md:mb-0">
        <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
      </div>
      <p>© 2023 AutoLog. All rights reserved.</p>
    </footer>
  );
}
