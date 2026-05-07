

export interface AuditResult {
  currentTool: string;
  currentPlan: string;
  recommendedPlan: string;
  monthlySavings: number;
  yearlySavings: number;
  reason: string;
}

interface AuditInput {
  tool: string;
  plan: string;
  teamSize: number;
  currentSpend: number;
}

export function generateAudit(
  input: AuditInput
): AuditResult {
  const { tool, plan, teamSize } = input;

  // ChatGPT Logic
  if (tool === "ChatGPT") {
    if (plan === "Team" && teamSize <= 2) {
      return {
        currentTool: tool,
        currentPlan: plan,
        recommendedPlan: "Plus",
        monthlySavings: 10,
        yearlySavings: 120,
        reason:
          "Small teams usually do not need ChatGPT Team features.",
      };
    }

    if (plan === "Enterprise" && teamSize < 10) {
      return {
        currentTool: tool,
        currentPlan: plan,
        recommendedPlan: "Team",
        monthlySavings: 30,
        yearlySavings: 360,
        reason:
          "Enterprise plans are typically unnecessary for smaller teams.",
      };
    }
  }

  // Cursor Logic
  if (tool === "Cursor") {
    if (plan === "Business" && teamSize <= 3) {
      return {
        currentTool: tool,
        currentPlan: plan,
        recommendedPlan: "Pro",
        monthlySavings: 20,
        yearlySavings: 240,
        reason:
          "Cursor Business is better suited for smaller engineering teams.",
      };
    }
  }

  // Claude Logic
  if (tool === "Claude") {
    if (plan === "Team" && teamSize <= 2) {
      return {
        currentTool: tool,
        currentPlan: plan,
        recommendedPlan: "Pro",
        monthlySavings: 10,
        yearlySavings: 120,
        reason:
          "Claude Pro provides similar value for smaller teams.",
      };
    }
  }

  // Default Optimized Case
  return {
    currentTool: tool,
    currentPlan: plan,
    recommendedPlan: plan,
    monthlySavings: 0,
    yearlySavings: 0,
    reason:
      "Your current AI stack already appears well optimized.",
  };
}