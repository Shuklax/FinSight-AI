# FinSight AI

ChatGPT for Finance, but with real documents + structured insights.

## Overview

FinOps AI is an end-to-end system that analyzes financial reports, earnings PDFs, and news articles, and produces structured insights using a Retrieval-Augmented Generation (RAG) pipeline.

It extracts text → embeds it → stores vectors in FAISS → retrieves relevant chunks → feeds them into an LLM → outputs risk summaries, sentiment, key metrics, and actionable insights.

<img width="1918" height="871" alt="image" src="https://github.com/user-attachments/assets/ab784778-6bd0-422d-a544-154676d380fb" />


This project demonstrates:

1. **Python LLM engineering**
2. **RAG architecture**
3. **Embeddings + FAISS**
4. **Structured LLM output**
5. **End-to-end product thinking**

## Features (MVP)

1. Upload PDF, URL, or plain text
2. Automatic text preprocessing + chunking
3. Embedding generation (OpenAI / Jina / Cohere)
4. Vector indexing using FAISS
5. RAG query pipeline
6. LLM generates:
    - risk factors
    - sentiment analysis
    - opportunities & threats
    - extracted metrics
    - structured JSON summary
7. REST API (FastAPI)
8. Ready for React UI integration

## Architecture Diagram

High-Level Architecture:  
<img width="1059" height="501" alt="image" src="https://github.com/user-attachments/assets/103dcd4d-7611-4125-a309-30413504215a" />


## API Endpoints

**POST /analyze**  
Analyzes a financial document or URL.

**Request:**
```json
{
  "type": "pdf",
  "input": "http://newslink.com/article123",
  "analysis-type": "comprehensive-review",
  "focus-area": "risk-&-revenue",
  "query": "summarize risks and metrics"
}
```

**Response (simplified):**
```json
{
  "summary": [
    "Bullet point 1",
    "Bullet point 2",
    "Bullet point 3"
  ],
  "sentiment": "neutral",
  "risk_factors": ["..."],
  "opportunities": ["..."],
  "key_metrics": {
    "revenue": { "value": "$4.2B", "change": "15%", "direction": "up" },
    "eps": { "value": "$1.24", "change": "8%", "direction": "up" },
    "op_margin": { "value": "22.5%", "change": "1.2%", "direction": "down" },
    "free_cash_flow": { "value": "$850M", "change": null, "direction": "unknown" }
  },
  "confidence_score": 87.5,
  "sources_used": 5,
  "citations_used": 3
}
```
