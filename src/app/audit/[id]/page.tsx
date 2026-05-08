"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

interface AuditTool {
  tool: string;
  plan: string;
  teamSize: number;
}

interface AuditData {
  id: string;
  monthly_savings: number;
  yearly_savings: number;
  summary: string;
  tools: AuditTool[];
}

interface AuditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AuditPage({
  params,
}: AuditPageProps) {
  const [audit, setAudit] =
    useState<AuditData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  useEffect(() => {
    const fetchAudit = async () => {
      const resolvedParams =
        await params;

      const { data, error } =
        await supabase
          .from("audits")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

      if (!error && data) {
        setAudit(data);
      }

      setLoading(false);
    };

    fetchAudit();
  }, [params]);

  const handleLeadSubmit =
    async () => {
      if (!email) return;

      const { error } =
        await supabase
          .from("leads")
          .insert({
            email,
            company,
            role,
          });

      if (error) {
        console.log(error);
        return;
      }

      alert(
        "Lead captured successfully!"
      );

      setEmail("");
      setCompany("");
      setRole("");
    };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Audit...
        </h1>
      </main>
    );
  }

  if (!audit) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Audit Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-10">
          <p className="text-sm text-gray-400 mb-4">
            AI Spend Audit Report
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Save $
            {audit.monthly_savings}
            /month
          </h1>

          <p className="text-gray-400 text-xl mt-4">
            Estimated annual savings:
            <span className="text-white font-semibold">
              {" "}
              $
              {audit.yearly_savings}
            </span>
          </p>

          <div className="mt-10 bg-black rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">
              Personalized Summary
            </h2>

            <p className="text-gray-300 leading-8">
              {audit.summary}
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">
              Tools Audited
            </h2>

            <div className="grid gap-6">
              {audit.tools.map(
                (
                  tool: AuditTool,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="bg-black border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {tool.tool}
                        </h3>

                        <p className="text-gray-400 mt-2">
                          Plan:
                          {" "}
                          {tool.plan}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-gray-400 text-sm">
                          Team Size
                        </p>

                        <p className="text-2xl font-bold">
                          {tool.teamSize}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Lead Capture */}
          <div className="mt-10 bg-black border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold">
              Get Full Report
            </h2>

            <p className="text-gray-400 mt-3">
              Capture your audit and get future optimization insights.
            </p>

            <div className="grid gap-4 mt-6">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) =>
                  setCompany(
                    e.target.value
                  )
                }
                className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value
                  )
                }
                className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={
                  handleLeadSubmit
                }
                className="bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Save My Report
              </button>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Powered by SpendScope
              </p>
            </div>

            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              Book Credex Consultation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}