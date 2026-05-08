"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          SpendScope
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              window.dispatchEvent(
                new Event("scroll-to-form")
              );
            }}
            className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Start Audit
          </button>

          <Link
            href="/history"
            className="text-gray-300 hover:text-white transition font-medium"
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}