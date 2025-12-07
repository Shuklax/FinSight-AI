import { create } from "zustand";

type SourceMaterialStore = {
  inputType: string;
  inputMaterial: string;
  focusArea: string;
  analysisType: string;
  specificQuestion: string;
  setInputType: (inputType: string) => void;
  setInputMaterial: (inputMaterial: string) => void;
  setFocusArea: (focusArea: string) => void;
  setAnalysisType: (analysisType: string) => void;
  setSpecificQuestion: (specificQuestion: string) => void;
};

export const useSourceMaterialStore = create<SourceMaterialStore>((set) => ({
  inputType: "",
  inputMaterial: "",
  focusArea: "",
  analysisType: "",
  specificQuestion: "",
  setInputType: (inputType) => set({ inputType }),
  setInputMaterial: (inputMaterial) => set({ inputMaterial }),
  setFocusArea: (focusArea) => set({ focusArea }),
  setAnalysisType: (analysisType) => set({ analysisType }),
  setSpecificQuestion: (specificQuestion) => set({ specificQuestion }),
}));

type MetricDetail = {
  value: string | null;
  change: string | null;
  direction: "up" | "down" | "flat" | "unknown";
};

type KeyMetrics = {
  revenue?: MetricDetail;
  eps?: MetricDetail;
  op_margin?: MetricDetail;
  free_cash_flow?: MetricDetail;
  profit?: MetricDetail;
  guidance?: MetricDetail;
  debt?: MetricDetail;
  cash_flow?: MetricDetail;
};

type ResultStore = {
  summary: string[];
  sentiment: string;
  riskFactors: string[];
  opportunities: string[];
  keyMetrics: KeyMetrics;
  confidenceScore: number;
  sourcesUsed: number;
  setSummary: (summary: string[]) => void;
  setSentiment: (sentiment: string) => void;
  setRiskFactors: (riskFactors: string[]) => void;
  setOpportunities: (opportunities: string[]) => void;
  setKeyMetrics: (keyMetrics: KeyMetrics) => void;
  setConfidenceScore: (confidenceScore: number) => void;
  setSourcesUsed: (sourcesUsed: number) => void;
};

export const useResultStore = create<ResultStore>((set) => ({
  summary: [],
  sentiment: "",
  riskFactors: [],
  opportunities: [],
  keyMetrics: {},
  confidenceScore: 0,
  sourcesUsed: 0,
  setSummary: (summary) => set({ summary }),
  setSentiment: (sentiment) => set({ sentiment }),
  setRiskFactors: (riskFactors) => set({ riskFactors }),
  setOpportunities: (opportunities) => set({ opportunities }),
  setKeyMetrics: (keyMetrics) => set({ keyMetrics }),
  setConfidenceScore: (confidenceScore) => set({ confidenceScore }),
  setSourcesUsed: (sourcesUsed) => set({ sourcesUsed }),
}));
