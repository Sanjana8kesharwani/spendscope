export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          SpendScope
        </h1>

        <button className="bg-white text-black px-5 py-2 rounded-xl font-medium">
          Start Audit
        </button>
      </div>
    </nav>
  );
}