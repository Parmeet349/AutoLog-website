import Image from "next/image";

export default function FeaturesPage() {
  const features = [
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
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Key Features</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-[#111827] p-6 rounded-lg hover:shadow-lg transition">
            <Image src={feature.img} alt={feature.title} width={400} height={200} className="rounded-md mb-4"/>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
