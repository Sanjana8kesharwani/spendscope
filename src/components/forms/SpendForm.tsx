"use client";

import { useEffect, useState } from "react";
import { pricingData } from "@/data/pricingData";
import {
  generateAudit,
  AuditResult as AuditResultType,
} from "@/lib/auditEngine";
import AuditResult from "@/components/audit/AuditResult";
import SavingsHero from "@/components/audit/SavingsHero";

const tools = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
];


interface ToolData {
  id: number;
  tool: string;
  plan: string;
  monthlySpend: number;
  teamSize: number;
  useCase: string;
}

export default function SpendForm() {
  // Persistent Tools State
  const [toolsData, setToolsData] = useState<ToolData[]>(() => {
    if (typeof window !== "undefined") {
      const savedData =
        localStorage.getItem("audit-tools");

      if (savedData) {
        return JSON.parse(savedData);
      }
    }

    return [
      {
        id: 1,
        tool: "",
        plan: "",
        monthlySpend: 0,
        teamSize: 1,
        useCase: "Coding",
      },
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "audit-tools",
      JSON.stringify(toolsData)
    );
  }, [toolsData]);

  // Audit Results
  const [auditResults, setAuditResults] =
    useState<AuditResultType[]>([]);

  // Add another tool
  const addTool = () => {
    setToolsData([
      ...toolsData,
      {
        id: Date.now(),
        tool: "",
        plan: "",
        monthlySpend: 0,
        teamSize: 1,
        useCase: "Coding",
      },
    ]);
  };

  // Generate Audit
  const handleGenerateAudit = () => {
    const results = toolsData
      .filter((item) => item.tool && item.plan)
      .map((item) => {
        const currentPrice =
          (
            pricingData[
              item.tool as keyof typeof pricingData
            ].plans as Record<string, number>
          )[item.plan] || 0;

        return generateAudit({
          tool: item.tool,
          plan: item.plan,
          teamSize: item.teamSize,
          currentSpend: currentPrice,
        });
      });

    setAuditResults(results);
  };

  // Total Savings
  const totalMonthlySavings = auditResults.reduce(
    (sum, item) => sum + item.monthlySavings,
    0
  );

  const totalYearlySavings = auditResults.reduce(
    (sum, item) => sum + item.yearlySavings,
    0
  );

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

          {/* Dynamic Tool Cards */}
          <div className="space-y-8 mt-10">
            {toolsData.map((item, index) => {
              const currentPrice =
                item.tool && item.plan
                  ? (
                      pricingData[
                        item.tool as keyof typeof pricingData
                      ].plans as Record<string, number>
                    )[item.plan]
                  : "";

              return (
                <div key={item.id} className="border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-6 text-white">
                    Tool #{index + 1}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                   
                    <div>
                      <label className="text-sm text-gray-300">
                        AI Tool
                      </label>

                      <select
                        value={item.tool}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].tool =
                            e.target.value;

                          updated[index].plan = "";

                          setToolsData(updated);
                        }}
                        className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3">
                        <option value="">
                          Select Tool
                        </option>

                        {tools.map((tool) => (
                          <option
                            key={tool}
                            value={tool}
                          >
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

                      <input type="number" value={currentPrice} readOnly
                      className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"/>
                    </div>

                    {/* Plan */}
                    <div>
                      <label className="text-sm text-gray-300">
                        Plan
                      </label>

                      <select
                        value={item.plan}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].plan =
                            e.target.value;

                          setToolsData(updated);
                        }}
                        className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
                      >
                        <option value="">
                          Select Plan
                        </option>

                        {item.tool &&
                          Object.keys(
                            pricingData[
                              item.tool as keyof typeof pricingData
                            ].plans
                          ).map((plan) => (
                            <option
                              key={plan}
                              value={plan}
                            >
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

                      <select
                        value={item.useCase}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].useCase =
                            e.target.value;

                          setToolsData(updated);
                        }}
                        className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
                      >
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
                        value={item.teamSize}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].teamSize =
                            Number(e.target.value);

                          setToolsData(updated);
                        }}
                        className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Tool Button */}
          <button
            onClick={addTool}
            className="mt-8 w-full border border-white/10 py-3 rounded-xl text-white hover:bg-white/5 transition"
          >
            + Add Another Tool
          </button>

          {/* Generate Audit */}
          <button
            onClick={handleGenerateAudit}
            className="mt-4 w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Generate Audit
          </button>
        </div>

        {/* Savings Hero */}
        {auditResults.length > 0 && (
          <SavingsHero
            monthlySavings={totalMonthlySavings}
            yearlySavings={totalYearlySavings}
          />
        )}

        {/* Audit Results */}
        {auditResults.length > 0 && (
          <div className="space-y-6 mt-6">
            {auditResults.map((result, index) => (
              <AuditResult
                key={index}
                result={result}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}