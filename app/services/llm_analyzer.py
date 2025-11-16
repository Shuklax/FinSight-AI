import os
import json
from typing import List
import openai
from dotenv import load_dotenv
from app.models.schemas import AnalyzeResponse, KeyMetrics

load_dotenv()

class LLMAnalyzer:
    """Uses LLM to generate structured financial analysis"""
    
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY not found")
        
        self.client = openai.OpenAI(api_key=self.api_key)
        self.model = os.getenv("LLM_MODEL", "gpt-4-turbo-preview")
    
    def analyze(self, context_chunks: List[str], query: str) -> AnalyzeResponse:
        """
        Analyze financial document with LLM
        
        Args:
            context_chunks: Retrieved document chunks
            query: User query
            
        Returns:
            AnalyzeResponse with structured insights
        """
        
        # Combine context
        context = "\n\n---\n\n".join(context_chunks)
        
        # System prompt for financial analysis
        system_prompt = """You are an expert financial analyst. Analyze the provided financial document context and extract structured insights.

Your response MUST be a valid JSON object with this exact structure:
{
  "summary": "Brief executive summary (2-3 sentences)",
  "sentiment": "positive/negative/neutral/mixed",
  "risk_factors": ["risk 1", "risk 2", ...],
  "opportunities": ["opportunity 1", "opportunity 2", ...],
  "key_metrics": {
    "revenue": "extracted value or null",
    "profit": "extracted value or null",
    "eps": "extracted value or null",
    "guidance": "extracted value or null",
    "debt": "extracted value or null",
    "cash_flow": "extracted value or null"
  },
  "confidence_score": 0.0-1.0
}

Rules:
- Extract actual numbers when available
- Be concise but specific
- Only include high-confidence insights
- Use "null" for missing metrics
- Confidence score reflects data quality and completeness"""

        user_prompt = f"""Query: {query}

Financial Document Context:
{context}

Analyze the above and respond with a JSON object following the required structure."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.3,
                max_tokens=1500,
                response_format={"type": "json_object"}  # Enforce JSON mode
            )
            
            # Parse JSON response
            result_text = response.choices[0].message.content
            result_json = json.loads(result_text)
            
            # Convert to Pydantic model
            return AnalyzeResponse(
                summary=result_json.get("summary", "Analysis completed"),
                sentiment=result_json.get("sentiment", "neutral"),
                risk_factors=result_json.get("risk_factors", []),
                opportunities=result_json.get("opportunities", []),
                key_metrics=KeyMetrics(**result_json.get("key_metrics", {})),
                confidence_score=result_json.get("confidence_score", 0.5),
                sources_used=len(context_chunks)
            )
            
        except json.JSONDecodeError as e:
            # Fallback response if JSON parsing fails
            return AnalyzeResponse(
                summary="Analysis completed but structured output failed",
                sentiment="neutral",
                risk_factors=["Unable to extract structured insights"],
                opportunities=[],
                key_metrics=KeyMetrics(),
                confidence_score=0.3,
                sources_used=len(context_chunks)
            )
        except Exception as e:
            raise Exception(f"LLM analysis failed: {str(e)}")
    
    def generate_simple_summary(self, text: str, max_length: int = 200) -> str:
        """Generate a simple summary (fallback method)"""
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a financial analyst. Provide concise summaries."},
                    {"role": "user", "content": f"Summarize this in {max_length} characters or less:\n\n{text}"}
                ],
                temperature=0.3,
                max_tokens=100
            )
            return response.choices[0].message.content.strip()
        except:
            return text[:max_length] + "..."