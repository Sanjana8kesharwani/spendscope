import { AuditResult } from "./auditEngine";

export function generateSummary(
  results: AuditResult[]
) {
  const totalMonthlySavings = results.reduce(
    (sum, item) => sum + item.monthlySavings,
    0
  );

  const totalYearlySavings = results.reduce(
    (sum, item) => sum + item.yearlySavings,
    0
  );

  const recommendations = results
    .filter(
      (item) =>
        item.currentPlan !== item.recommendedPlan
    )
    .map(
      (item) =>
        `${item.currentTool}: ${item.currentPlan} → ${item.recommendedPlan}`
    );

  if (recommendations.length === 0) {
    return `
Your AI stack already appears well optimized. 
No significant overspending patterns were detected across your selected tools.
    `;
  }

  return `
Your current AI stack appears to be over-provisioned for your team size and usage patterns.

Recommended optimizations:
${recommendations.join(", ")}

Estimated savings:
$${totalMonthlySavings}/month 
($${totalYearlySavings}/year)

These recommendations could reduce unnecessary AI spending while preserving similar functionality and workflows.
  `;
}