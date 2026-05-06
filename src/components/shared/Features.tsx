const features = [
  {
    title: "AI Spend Analysis",
    desc: "Instantly detect where your team is overspending.",
  },
  {
    title: "Smart Recommendations",
    desc: "Get better plans and cheaper alternatives.",
  },
  {
    title: "Shareable Reports",
    desc: "Generate public audit reports with clean previews.",
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {features.map((item) => (
          <div
            key={item.title}
            className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}