import { supabase } from "@/lib/supabase";

interface AuditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AuditPage({ params }: AuditPageProps) {
  const { id } = await params;

  const { data: audit, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !audit) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Audit Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-10">
          <p className="text-sm text-gray-400 mb-4">AI Spend Audit Report</p>

          <h1 className="text-5xl font-bold leading-tight">
            Save ${audit.monthly_savings}
            /month
          </h1>

          <p className="text-gray-400 text-xl mt-4">
            Estimated annual savings:
            <span className="text-white font-semibold">
              {" "}
              ${audit.yearly_savings}
            </span>
          </p>

          <div className="mt-10 bg-black rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">
              Personalized Summary
            </h2>

            <p className="text-gray-300 leading-8">{audit.summary}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">Tools Audited</h2>

            <div className="grid gap-6">
              {audit.tools.map(
                (
                  tool: {
                    tool: string;
                    plan: string;
                    teamSize: number;
                  },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="bg-black border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{tool.tool}</h3>

                        <p className="text-gray-400 mt-2">Plan: {tool.plan}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Team Size</p>

                        <p className="text-2xl font-bold">{tool.teamSize}</p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Powered by SpendScope</p>
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
