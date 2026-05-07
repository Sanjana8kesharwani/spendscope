

interface Props {
  result: {
    currentTool: string;
    currentPlan: string;
    recommendedPlan: string;
    monthlySavings: number;
    yearlySavings: number;
    reason: string;
  };
}

export default function AuditResult({ result }: Props) {
  return (
    <div className="mt-10 bg-zinc-900 border border-white/10 rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-white">
        Audit Results
      </h2>

      <div className="mt-6 space-y-4 text-white">
        <div>
          <span className="text-gray-400">
            Current Plan:
          </span>{" "}
          {result.currentPlan}
        </div>

        <div>
          <span className="text-gray-400">
            Recommended Plan:
          </span>{" "}
          {result.recommendedPlan}
        </div>

        <div>
          <span className="text-gray-400">
            Monthly Savings:
          </span>{" "}
          ${result.monthlySavings}
        </div>

        <div>
          <span className="text-gray-400">
            Annual Savings:
          </span>{" "}
          ${result.yearlySavings}
        </div>

        <div className="text-green-400">
          {result.reason}
        </div>
      </div>
    </div>
  );
}