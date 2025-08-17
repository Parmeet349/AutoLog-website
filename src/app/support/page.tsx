export default function SupportPage() {
  const faqs = [
    { q: "How do I log fuel expenses?", a: "Scan receipts or enter manually using AutoLog." },
    { q: "Can I track multiple vehicles?", a: "Yes, you can manage multiple vehicles." },
    { q: "How do I upgrade to Premium?", a: "Visit the Pricing page and select Premium." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Support & FAQs</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#111827] p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
            <p className="text-gray-400">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
