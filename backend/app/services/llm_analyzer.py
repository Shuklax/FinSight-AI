import os
import json
from typing import List

import openai
from dotenv import load_dotenv

from app.models.schema import AnalyzeResponse, KeyMetrics

load_dotenv()


class LLMAnalyzer:
    """Uses LLM to generate structured financial analysis."""

    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY not found")

        self.client = openai.OpenAI(api_key=self.api_key)
        self.model = os.getenv("LLM_MODEL", "gpt-4-turbo-preview")

    def analyze(
        self,
        context_chunks: List[str],
        query: str,
        analysis_type: str,
        focus_area: str,
    ) -> AnalyzeResponse:
        """
        Analyze financial document with LLM.

        Args:
            context_chunks: Retrieved document chunks
            query: User query (optional free-form question)
            analysis_type: High-level analysis style from the UI
            focus_area: Primary financial focus area from the UI

        Returns:
            AnalyzeResponse with structured insights
        """

        # Combine context
        context = "\n\n---\n\n".join(context_chunks)

        # System prompt for financial analysis
        system_prompt = """You are an expert equity research analyst.
You will receive:
- A short description of the desired analysis type and focus area
- A user question (optional)
- A set of retrieved context chunks from financial documents.

You MUST respond with a **valid JSON object** that strictly follows this structure:
{
  "summary": "Brief executive summary (2-3 sentences)",
  "sentiment": "Positive/Negative/Neutral/Mixed",
  "risk_factors": ["risk 1", "risk 2", ...],
  "opportunities": ["opportunity 1", "opportunity 2", ...],
  "key_metrics": {
    "revenue": {
      "value": "e.g. '$4.2B'",
      "change": "e.g. '15%'",
      "direction": "up/down/flat/unknown"
    },
    "eps": {
      "value": "e.g. '$1.24'",
      "change": "e.g. '8%'",
      "direction": "up/down/flat/unknown"
    },
    "op_margin": {
      "value": "e.g. '22.5%'",
      "change": "e.g. '1.2%'",
      "direction": "up/down/flat/unknown"
    },
    "free_cash_flow": {
      "value": "e.g. '$850M'",
      "change": "if trend is mentioned, e.g. '5%'; otherwise null",
      "direction": "up/down/flat/unknown"
    },
    "profit": {
      "value": "... or null",
      "change": "... or null",
      "direction": "up/down/flat/unknown"
    },
    "guidance": {
      "value": "... or null",
      "change": "... or null",
      "direction": "up/down/flat/unknown"
    },
    "debt": {
      "value": "... or null",
      "change": "... or null",
      "direction": "up/down/flat/unknown"
    },
    "cash_flow": {
      "value": "... or null",
      "change": "... or null",
      "direction": "up/down/flat/unknown"
    }
  },
  "confidence_score": 0,
  "citations_used": 0
}

Rules:
- `summary` MUST be a list of short bullet-point strings (2–6 items).
- Align the style and emphasis of the analysis with `analysis_type` and `focus_area`.
- Extract actual numbers and YoY/ QoQ changes when available.
- If a metric is mentioned but no explicit change is stated, set `direction` based on qualitative language (e.g. "strong growth" -> "up") and leave `change` as null.
- If a metric is not mentioned at all, set its `value`, `change`, and `direction` to null or "unknown" as appropriate.
- Use "unknown" for `direction` when trend is unclear.
- Confidence score should be between 0 and 100 and reflect the quality and amount of available data.
- citations_used should be the number of distinct context chunks you actually relied on (not necessarily all provided chunks).
- Do NOT include any text outside of the JSON object (no commentary)."""

        user_prompt = f"""Analysis configuration:
- analysis_type: {analysis_type}
- focus_area: {focus_area}
- user_query: {query or "N/A"}

Financial document context:
{context}

Return ONLY the JSON object that follows the specified schema."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.3,
                max_tokens=1500,
                response_format={"type": "json_object"},  # Enforce JSON mode
            )

            # Parse JSON response
            result_text = response.choices[0].message.content
            result_json = json.loads(result_text)

            # Normalise summary: allow either string or list in raw JSON
            raw_summary = result_json.get("summary", [])
            if isinstance(raw_summary, str):
                # Split into bullets on line breaks / bullets if model didn't follow spec perfectly
                summary_list = [
                    s.strip("- ").strip()
                    for s in raw_summary.splitlines()
                    if s.strip()
                ]
            elif isinstance(raw_summary, list):
                summary_list = [str(item).strip() for item in raw_summary if str(item).strip()]
            else:
                summary_list = ["Analysis completed"]

            if not summary_list:
                summary_list = ["Analysis completed"]

            # Convert to Pydantic model
            confidence_raw = result_json.get("confidence_score", 50)
            try:
                confidence_value = float(confidence_raw)
            except (TypeError, ValueError):
                confidence_value = 50.0

            # Basic clamp to 0–100
            confidence_value = max(0.0, min(100.0, confidence_value))

            citations_raw = result_json.get("citations_used", len(context_chunks))
            try:
                citations_value = int(citations_raw)
            except (TypeError, ValueError):
                citations_value = len(context_chunks)

            return AnalyzeResponse(
                summary=result_json.get("summary", "Analysis completed"),
                sentiment=result_json.get("sentiment", "Neutral"),
                risk_factors=result_json.get("risk_factors", []),
                opportunities=result_json.get("opportunities", []),
                key_metrics=KeyMetrics(**result_json.get("key_metrics", {})),
                confidence_score=confidence_value,
                sources_used=len(context_chunks),
                citations_used=citations_value,
            )

        except json.JSONDecodeError:
            # Fallback response if JSON parsing fails
            return AnalyzeResponse(
                summary="Analysis completed but structured output failed",
                sentiment="Neutral",
                risk_factors=["Unable to extract structured insights"],
                opportunities=[],
                key_metrics=KeyMetrics(),
                confidence_score=30.0,
                sources_used=len(context_chunks),
                citations_used=len(context_chunks),
            )
        except Exception as e:
            raise Exception(f"LLM analysis failed: {str(e)}")

    def generate_simple_summary(self, text: str, max_length: int = 200) -> str:
        """Generate a simple summary (fallback method)."""
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a financial analyst. Provide concise summaries.",
                    },
                    {
                        "role": "user",
                        "content": f"Summarize this in {max_length} characters or less:\n\n{text}",
                    },
                ],
                temperature=0.3,
                max_tokens=100,
            )
            return response.choices[0].message.content.strip()
        except Exception:
            return text[:max_length] + "..."