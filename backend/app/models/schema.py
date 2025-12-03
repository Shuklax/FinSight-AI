from pydantic import BaseModel, Field
from typing import List, Optional, Literal


class AnalyzeRequest(BaseModel):
    """Request schema for the /analyze endpoint."""

    type: Literal["pdf", "url", "text"] = Field(..., description="Input type")
    input: str = Field(..., description="PDF URL, web URL, or plain text")

    # New knobs coming from the UI
    analysis_type: Literal[
        "comprehensive-review",
        "executive-summary",
        "risk-assessment",
        "financial-metrics",
    ] = Field(
        "comprehensive-review",
        alias="analysis-type",
        description="High-level analysis style",
    )
    focus_area: Literal[
        "general-overview",
        "risk-&-revenue",
        "profitability-&-margins",
        "debt-&-liquidity",
    ] = Field(
        "general-overview",
        alias="focus-area",
        description="Primary financial focus area",
    )

    query: Optional[str] = Field(
        "Analyze this financial document and extract key insights",
        description="Optional custom query",
    )

    class Config:
        # Allow both `analysis_type` and `analysis-type` in requests
        allow_population_by_field_name = True
        allow_population_by_alias = True


class MetricDetail(BaseModel):
    """Single metric with value + trend information for the key metrics table."""

    value: Optional[str] = Field(
        default=None,
        description="Primary metric value (e.g. '$4.2B', '22.5%')",
    )
    change: Optional[str] = Field(
        default=None,
        description="Magnitude of change (e.g. '15%', '1.2%'). Can be positive or negative.",
    )
    direction: Optional[Literal["up", "down", "flat", "unknown"]] = Field(
        default="unknown",
        description="Direction of change for UI arrows",
    )


class KeyMetrics(BaseModel):
    """
    Structured key metrics used by the frontend key metrics table.

    The field names are aligned with the UI rows: Revenue, EPS, Op. Margin, Free Cashflow.
    Additional metrics can be added over time.
    """

    revenue: Optional[MetricDetail] = Field(default_factory=MetricDetail)
    eps: Optional[MetricDetail] = Field(default_factory=MetricDetail)
    op_margin: Optional[MetricDetail] = Field(
        default_factory=MetricDetail, alias="op_margin"
    )
    free_cash_flow: Optional[MetricDetail] = Field(
        default_factory=MetricDetail, alias="free_cash_flow"
    )

    # Backwards-compatible placeholders for other commonly used metrics
    profit: Optional[MetricDetail] = Field(default_factory=MetricDetail)
    guidance: Optional[MetricDetail] = Field(default_factory=MetricDetail)
    debt: Optional[MetricDetail] = Field(default_factory=MetricDetail)
    cash_flow: Optional[MetricDetail] = Field(default_factory=MetricDetail)

    class Config:
        allow_population_by_field_name = True
        allow_population_by_alias = True


class AnalyzeResponse(BaseModel):
    """
    Structured LLM response returned by /analyze.

    - `summary` is now pointwise (bullet-style) summary items.
    """

    summary: List[str] = Field(
        ...,
        description="Pointwise executive summary (list of bullet points)",
    )
    sentiment: Literal["positive", "negative", "neutral", "mixed"] = Field(
        ..., description="Overall sentiment"
    )
    risk_factors: List[str] = Field(
        default_factory=list,
        description="Identified risks",
    )
    opportunities: List[str] = Field(
        default_factory=list,
        description="Growth opportunities",
    )
    key_metrics: KeyMetrics = Field(
        default_factory=KeyMetrics,
        description="Extracted financial metrics with trend information",
    )
    confidence_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Analysis confidence (0–100)",
    )
    sources_used: int = Field(
        ...,
        description="Number of document chunks analyzed",
    )
    citations_used: int = Field(
        ...,
        description="Number of distinct sources/citations used in the answer",
    )


class HealthResponse(BaseModel):
    status: str
    faiss_index_loaded: bool
    embedding_model: str
    llm_model: str