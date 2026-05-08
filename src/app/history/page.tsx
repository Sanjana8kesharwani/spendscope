import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function HistoryPage() {
  const { data: audits, error } =
    await supabase
      .from("audits")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Failed to load audits
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-gray-400">
              SpendScope
            </p>

            <h1 className="text-5xl font-bold mt-2">
              Audit History
            </h1>
          </div>

          <Link
            href="/"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            New Audit
          </Link>
        </div>

        {audits.length === 0 ? (
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No audits found
            </h2>

            <p className="text-gray-400 mt-4">
              Generate your first AI spend audit.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {audits.map((audit) => (
              <Link
                key={audit.id}
                href={`/audit/${audit.id}`}
              >
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        Audit Report
                      </p>

                      <h2 className="text-3xl font-bold mt-2">
                        Save $
                        {
                          audit.monthly_savings
                        }
                        /month
                      </h2>

                      <p className="text-gray-400 mt-4 max-w-3xl">
                        {audit.summary}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        Annual Savings
                      </p>

                      <p className="text-4xl font-bold mt-2">
                        $
                        {
                          audit.yearly_savings
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {audit.tools.map(
                      (
                        tool: {
                          tool: string;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="bg-black border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300"
                        >
                          {tool.tool}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}