"use client";

import { useState } from "react";
import { pricingData } from "@/data/pricingData";

const tools = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
];

export default function SpendForm() {
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const currentPrice =
  selectedTool && selectedPlan
    ? (
        pricingData[selectedTool as keyof typeof pricingData]
          .plans as Record<string, number>
      )[selectedPlan]
    : "";

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white">
            Run Your AI Spend Audit
          </h2>

          <p className="text-gray-400 mt-3">
            Enter your current AI stack and uncover hidden savings.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* AI Tool */}
            <div>
              <label className="text-sm text-gray-300">
                AI Tool
              </label>

              <select
                value={selectedTool}
                onChange={(e) => {
                  setSelectedTool(e.target.value);
                  setSelectedPlan("");
                }}
                className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="">Select Tool</option>

                {tools.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Spend */}
            <div>
              <label className="text-sm text-gray-300">
                Monthly Spend ($)
              </label>

              <input
                type="number"
                value={currentPrice}
                readOnly
                className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="text-sm text-gray-300">
                Plan
              </label>

              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="">Select Plan</option>

                {selectedTool &&
                  Object.keys(
                    pricingData[selectedTool as keyof typeof pricingData]
                      .plans
                  ).map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
              </select>
            </div>

            {/* Use Case */}
            <div>
              <label className="text-sm text-gray-300">
                Primary Use Case
              </label>

              <select className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3">
                <option>Coding</option>
                <option>Writing</option>
                <option>Research</option>
                <option>Data</option>
                <option>Mixed</option>
              </select>
            </div>

            {/* Team Size */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-300">
                Team Size
              </label>

              <input
                type="number"
                placeholder="5"
                className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
              />
            </div>
          </div>

          <button className="mt-8 w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Generate Audit
          </button>
        </div>
      </div>
    </section>
  );
}