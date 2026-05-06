import Navbar from "@/components/shared/Navbar";
import Features from "@/components/shared/Features";
import SpendForm from "@/components/forms/SpendForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold leading-tight max-w-4xl">
          Stop Overpaying for AI Tools
        </h1>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          Audit your AI stack instantly and discover hidden monthly savings.
        </p>

        <button className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold">
          Start Free Audit
        </button>
      </section>

      <Features />

      <SpendForm />
    </main>
  );
}