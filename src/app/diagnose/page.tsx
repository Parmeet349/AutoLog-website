import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagnosticAssistant from "@/components/DiagnosticAssistant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Vehicle Diagnostic Assistant | AutoLog",
  description:
    "Instant AI car issue diagnosis and fair market repair cost estimates separated by parts and labor.",
};

export default function DiagnosePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <DiagnosticAssistant />
      </main>

      <Footer />
    </div>
  );
}
