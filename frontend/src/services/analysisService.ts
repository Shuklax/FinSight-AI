import { useResultStore, useSourceMaterialStore } from "../store/store";
import type { AnalyzeRequest, AnalyzeResponse } from "../types/analysis";
import { ApiError, fetchJson } from "./apiClient";

export async function analyzeDocument(
  request: AnalyzeRequest
): Promise<AnalyzeResponse> {
  return fetchJson<AnalyzeResponse>("/api/analyze", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function runAnalysis(): Promise<void> {
  const sourceState = useSourceMaterialStore.getState();

  if (!sourceState.inputType || !sourceState.inputMaterial) {
    throw new Error("Please provide input type and material");
  }

  const request: AnalyzeRequest = {
    type: sourceState.inputType as "pdf" | "url" | "text",
    input: sourceState.inputMaterial,
    "analysis-type": (sourceState.analysisType ||
      "comprehensive-review") as AnalyzeRequest["analysis-type"],
    "focus-area": (sourceState.focusArea ||
      "general-overview") as AnalyzeRequest["focus-area"],
    query: sourceState.specificQuestion || undefined,
  };

  console.log("Sending analysis request: ", {
    ...request,
    input:
      request.input.length > 50
        ? request.input.substring(0, 50) + "..."
        : request.input,
  });

  try {
    const response = await analyzeDocument(request);

    console.log("received analysis response: ", response);

    const resultStore = useResultStore.getState();

    // Normalize arrays to ensure they are arrays even if API returns strings
    const normalizedSummary = Array.isArray(response.summary)
      ? response.summary
      : [response.summary];

    const normalizedRiskFactors = Array.isArray(response.risk_factors)
      ? response.risk_factors
      : [response.risk_factors];

    const normalizedOpportunities = Array.isArray(response.opportunities)
      ? response.opportunities
      : [response.opportunities];

    resultStore.setSummary(normalizedSummary);
    resultStore.setSentiment(response.sentiment);
    resultStore.setRiskFactors(normalizedRiskFactors);
    resultStore.setOpportunities(normalizedOpportunities);
    resultStore.setKeyMetrics(response.key_metrics);
    resultStore.setConfidenceScore(response.confidence_score);
    resultStore.setSourcesUsed(response.sources_used);

    console.log("Result store updated");
  } catch (error) {
    console.error("Analysis failed: ", error);
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw error;
  }
}
