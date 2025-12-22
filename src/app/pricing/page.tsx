export default function PricingPage() {
  const plans = [
    {
      title: "Essential",
      price: "$0",
      tagline: "Perfect for the casual driver",
      features: ["Single Vehicle Profile", "Manual Fuel Logging", "Standard Reminders", "30-Day History"]
    },
    {
      title: "Pro Collector",
      price: "$9.99",
      tagline: "For those who take care of their fleet",
      features: ["Unlimited Vehicles", "AI Receipt OCR", "Predictive Maintenance Alerts", "Advanced Export (CSV/PDF)", "Lifetime Cloud Sync"]
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">Choose Your Path</h1>
        <p className="text-slate-400 text-lg">Start free, upgrade whenever you need more power.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, idx) => (
          <div key={idx} className={`glass-card p-12 flex flex-col ${idx === 1 ? 'border-indigo-500/50 bg-indigo-500/5' : ''}`}>
            <h2 className="text-2xl font-bold mb-1">{plan.title}</h2>
            <p className="text-slate-500 text-sm mb-6">{plan.tagline}</p>
            <div className="text-5xl font-black mb-10">{plan.price}<span className="text-sm font-normal text-slate-500">/month</span></div>

            <ul className="mb-12 space-y-4 flex-1">
              {plan.features.map((f, i) => (
                <li key={i} className="text-slate-300 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {f}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-bold transition-all ${idx === 1 ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg' : 'border border-white/10 hover:bg-white/5'
              }`}>
              {idx === 1 ? 'Start Free Trial' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}