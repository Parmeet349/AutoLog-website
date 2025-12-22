export default function AboutPage() {
  return (
    <main className="bg-[#030712] text-white min-h-screen pt-32">
      <section className="max-w-4xl mx-auto px-8 space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-black">Our Mission</h1>
          <p className="text-xl text-indigo-400 font-medium italic">Putting you back in the driver&apos;s seat.</p>
        </div>

        <div className="glass-card p-10 space-y-6 text-slate-300 leading-relaxed text-lg">
          <p>
            AutoLog was born from a simple frustration: vehicle management felt like a chore.
            Between paper receipts, missed oil changes, and complicated spreadsheets, the joy of
            ownership was being buried under paperwork.
          </p>
          <p>
            We built AutoLog to be the digital companion for every car enthusiast and daily commuter.
            Our goal is to provide a seamless, beautiful, and private way to track every mile and every
            maintenance milestone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 py-12">
          <div className="text-center p-8 glass-card">
            <h4 className="text-3xl font-bold mb-2">100% Privacy</h4>
            <p className="text-slate-400">Your data belongs to you. Always.</p>
          </div>
          <div className="text-center p-8 glass-card">
            <h4 className="text-3xl font-bold mb-2">Modern UX</h4>
            <p className="text-slate-400">Designed for speed and ease of use.</p>
          </div>
        </div>
      </section>
    </main>
  );
}