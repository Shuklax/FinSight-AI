from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Literal

class AnalyzeRequest(BaseModel):
    type: Literal["pdf", "url", "text"] = Field(..., description="Input type")
    input: str = Field(..., description="PDF URL, web URL, or plain text")
    query: Optional[str] = Field(
        "Analyze this financial document and extract key insights",
        description="Optional custom query"
    )

class KeyMetrics(BaseModel):
    revenue: Optional[str] = None
    profit: Optional[str] = None
    eps: Optional[str] = None
    guidance: Optional[str] = None
    debt: Optional[str] = None
    cash_flow: Optional[str] = None

class AnalyzeResponse(BaseModel):
    summary: str = Field(..., description="Executive summary")
    sentiment: Literal["positive", "negative", "neutral", "mixed"] = Field(
        ..., description="Overall sentiment"
    )
    risk_factors: List[str] = Field(default_factory=list, description="Identified risks")
    opportunities: List[str] = Field(default_factory=list, description="Growth opportunities")
    key_metrics: KeyMetrics = Field(default_factory=KeyMetrics, description="Extracted metrics")
    confidence_score: float = Field(..., ge=0, le=1, description="Analysis confidence")
    sources_used: int = Field(..., description="Number of document chunks analyzed")

class HealthResponse(BaseModel):
    status: str
    faiss_index_loaded: bool
    embedding_model: str
    llm_model: str