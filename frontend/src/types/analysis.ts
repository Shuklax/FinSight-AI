
export type AnalyzeRequest = {
    type: "pdf" | "url" | "text";
    input: string;
    "analysis-type": "comprehensive-review" | "executive-summary" | "risk-assessment" | "financial-metrics";
    "focus-area": "general-overview" | "risk-&-revenue" | "profitability-&-margins" | "debt-&-liquidity";
    query?: string;
  };
  
  
  export type MetricDetail = {
    value: string | null;
    change: string | null;
    direction: "up" | "down" | "flat" | "unknown";
  };
  
  export type KeyMetrics = {
    revenue?: MetricDetail;
    eps?: MetricDetail;
    op_margin?: MetricDetail;
    free_cash_flow?: MetricDetail;
    profit?: MetricDetail;
    guidance?: MetricDetail;
    debt?: MetricDetail;
    cash_flow?: MetricDetail;
  };
  
  export type AnalyzeResponse = {
    summary: string[];
    sentiment: "positive" | "negative" | "neutral" | "mixed";
    risk_factors: string[];
    opportunities: string[];
    key_metrics: KeyMetrics;
    confidence_score: number;
    sources_used: number;
    citations_used: number;
  };