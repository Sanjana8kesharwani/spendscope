interface Props {
  monthlySavings: number;
  yearlySavings: number;
}

export default function SavingsHero({
  monthlySavings,
  yearlySavings,
}: Props) {
  return (
    <div className="mt-10 bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/20 rounded-3xl p-8">
      <p className="text-green-400 text-sm uppercase tracking-wide">
        Estimated Savings
      </p>

      <h2 className="text-5xl font-bold text-white mt-4">
        ${monthlySavings}/mo
      </h2>

      <p className="text-2xl text-gray-300 mt-3">
        ${yearlySavings} saved annually
      </p>

      <div className="mt-6 text-gray-400">
        Optimize your AI stack and reduce unnecessary spend.
      </div>
    </div>
  );
}