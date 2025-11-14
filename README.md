# AI-Financial-Research-Agent

ChatGPT for Finance, but with real documents + structured insights.

## Overview

AI Financial Research Agent is an end-to-end system that analyzes financial reports, earnings PDFs, and news articles, and produces structured insights using a Retrieval-Augmented Generation (RAG) pipeline.

It extracts text → embeds it → stores vectors in FAISS → retrieves relevant chunks → feeds them into an LLM → outputs risk summaries, sentiment, key metrics, and actionable insights.

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
    "type": "pdf/url/text",
    "input": "http://newslink.com/article123",
    "query": "summarize risks and metrics"
}
```

**Response:**
```json
{
  "summary": "...",
  "sentiment": "neutral",
  "risk_factors": [...],
  "opportunities": [...],
  "key_metrics": {
    "revenue": "...",
    "profit": "...",
    "guidance": "..."
  }
}
```
