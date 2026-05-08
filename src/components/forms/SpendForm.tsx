"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { pricingData } from "@/data/pricingData";
import {
  generateAudit,
  AuditResult as AuditResultType,
} from "@/lib/auditEngine";

import { generateSummary } from "@/lib/generateSummary";

import AuditResult from "@/components/audit/AuditResult";
import SavingsHero from "@/components/audit/SavingsHero";

import { supabase } from "@/lib/supabase";

const tools = ["ChatGPT", "Claude", "Cursor", "GitHub Copilot", "Gemini"];

interface ToolData {
  id: number;
  tool: string;
  plan: string;
  monthlySpend: number;
  teamSize: number;
  useCase: string;
}

export default function SpendForm() {
  const router = useRouter();

  // Hydration-safe state
  const [hydrated, setHydrated] = useState(false);

  // Tool State
  const [toolsData, setToolsData] = useState<ToolData[]>([
    {
      id: 1,
      tool: "",
      plan: "",
      monthlySpend: 0,
      teamSize: 1,
      useCase: "Coding",
    },
  ]);

  // Load localStorage AFTER hydration
  useEffect(() => {
    setTimeout(() => {
      const savedData = localStorage.getItem("audit-tools");

      if (savedData) {
        setToolsData(JSON.parse(savedData));
      }

      setHydrated(true);
    }, 0);
  }, []);

  // Save data
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("audit-tools", JSON.stringify(toolsData));
    }
  }, [toolsData, hydrated]);

  // Audit Results
  const [auditResults, setAuditResults] = useState<AuditResultType[]>([]);

  // Error State
  const [error, setError] = useState("");

  // AI Summary
  const [summary, setSummary] = useState("");

  // Add tool card
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
  const handleGenerateAudit = async () => {
    const incompleteTool = toolsData.some((item) => !item.tool || !item.plan);

    if (incompleteTool) {
      setError(
        "Please complete all tool selections before generating an audit.",
      );

      return;
    }

    setError("");

    const results = toolsData
      .filter((item) => item.tool && item.plan)
      .map((item) => {
        const currentPrice =
          (
            pricingData[item.tool as keyof typeof pricingData].plans as Record<
              string,
              number
            >
          )[item.plan] || 0;

        return generateAudit({
          tool: item.tool,
          plan: item.plan,
          teamSize: item.teamSize,
          currentSpend: currentPrice,
        });
      });

    setAuditResults(results);

    const generatedSummary = generateSummary(results);

    setSummary(generatedSummary);

    const totalMonthlySavings = results.reduce(
      (sum, item) => sum + item.monthlySavings,
      0,
    );

    const totalYearlySavings = results.reduce(
      (sum, item) => sum + item.yearlySavings,
      0,
    );

    try {
      const { data, error } = await supabase
        .from("audits")
        .insert({
          tools: toolsData,
          summary: generatedSummary,
          monthly_savings: totalMonthlySavings,
          yearly_savings: totalYearlySavings,
        })
        .select()
        .single();

      if (error) {
        console.log(error);

        alert(JSON.stringify(error));

        return;
      }

      console.log("Audit saved successfully");

      router.push(`/audit/${data.id}`);
    } catch (error) {
      console.log("Unexpected error", error);
    }
  };

  // Total Savings
  const totalMonthlySavings = auditResults.reduce(
    (sum, item) => sum + item.monthlySavings,
    0,
  );

  const totalYearlySavings = auditResults.reduce(
    (sum, item) => sum + item.yearlySavings,
    0,
  );

  // Prevent hydration mismatch
  if (!hydrated) {
    return null;
  }

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

          {/* Tool Cards */}
          <div className="space-y-8 mt-10">
            {toolsData.map((item, index) => {
              const currentPrice =
                item.tool && item.plan
                  ? (
                      pricingData[item.tool as keyof typeof pricingData]
                        .plans as Record<string, number>
                    )[item.plan]
                  : "";

              return (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      Tool #{index + 1}
                    </h3>

                    {toolsData.length > 1 && (
                      <button
                        onClick={() => {
                          const updated = toolsData.filter(
                            (_, i) => i !== index,
                          );

                          setToolsData(updated);
                        }}
                        className="text-red-400 text-sm hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Tool */}
                    <div>
                      <label className="text-sm text-gray-300">AI Tool</label>

                      <select
                        value={item.tool}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].tool = e.target.value;

                          updated[index].plan = "";

                          setToolsData(updated);
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
                      <label className="text-sm text-gray-300">Plan</label>

                      <select
                        value={item.plan}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].plan = e.target.value;

                          setToolsData(updated);
                        }}
                        className="w-full mt-2 bg-black border border-white/10 rounded-xl px-4 py-3"
                      >
                        <option value="">Select Plan</option>

                        {item.tool &&
                          Object.keys(
                            pricingData[item.tool as keyof typeof pricingData]
                              .plans,
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

                      <select
                        value={item.useCase}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].useCase = e.target.value;

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
                      <label className="text-sm text-gray-300">Team Size</label>

                      <input
                        type="number"
                        value={item.teamSize}
                        onChange={(e) => {
                          const updated = [...toolsData];

                          updated[index].teamSize = Number(e.target.value);

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

          {/* Add Tool */}
          <button
            onClick={addTool}
            className="mt-8 w-full border border-white/10 py-3 rounded-xl text-white hover:bg-white/5 transition"
          >
            + Add Another Tool
          </button>

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

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

        {/* AI Summary */}
        {summary && (
          <div className="mt-6 bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white">AI Summary</h2>

            <p className="mt-4 text-gray-300 leading-8 whitespace-pre-line">
              {summary}
            </p>
          </div>
        )}

        {/* Audit Results */}
        {auditResults.length > 0 && (
          <div className="space-y-6 mt-6">
            {auditResults.map((result, index) => (
              <AuditResult key={index} result={result} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
