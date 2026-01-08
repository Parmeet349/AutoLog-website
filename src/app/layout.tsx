import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "AutoLog",
  icons: {
    icon: "/favicon.ico",
  },
  description: "Track and manage your vehicle expenses effortlessly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0B0F19] text-white min-h-screen flex flex-col">
        <div className="scroll-smooth scroll-pt-24">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
