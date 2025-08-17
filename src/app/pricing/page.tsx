export default function PricingPage() {
  const plans = [
    { title: "Free", price: "$0/month", features: ["Basic fuel tracking", "Trip logs"] },
    { title: "Premium", price: "$9.99/month", features: ["Unlimited tracking", "Maintenance reminders", "Advanced analytics"] },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-[#111827] p-8 rounded-lg hover:shadow-lg transition text-center">
            <h2 className="text-2xl font-semibold mb-4">{plan.title}</h2>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((f, i) => <li key={i} className="text-gray-400">• {f}</li>)}
            </ul>
            <button className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-500 font-medium">Choose Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
}
