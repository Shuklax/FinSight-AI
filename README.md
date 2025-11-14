# AI-Financial-Research-Agent
ChatGPT for Finance, but with real documents + structured insights.

## Overview
AI Financial Research Agent is an end-to-end system that analyzes financial reports, earnings PDFs, and news articles, and produces structured insights using a Retrieval-Augmented Generation (RAG) pipeline.

It extracts text → embeds it → stores vectors in FAISS → retrieves relevant chunks → feeds them into an LLM → outputs risk summaries, sentiment, key metrics, and actionable insights.

This project demonstrates:
    1.) Python LLM engineering
    2.) RAG architecture
    3.) embeddings + FAISS
    4.) structured LLM output
    5.) end-to-end product thinking

## Features (MVP)
1.) Upload PDF, URL, or plain text
2.) Automatic text preprocessing + chunking
3.) Embedding generation (OpenAI / Jina / Cohere)
4.) Vector indexing using FAISS
5.) RAG query pipeline
6.) LLM generates:
        a.) risk factors
        b.) sentiment analysis
        c.) opportunities & threats
        d.) extracted metrics
        e.) structured JSON summary
7.) REST API (FastAPI)
8.) Ready for React UI integration

## Architecture Diagram (text / mermaid)
High-Level Architecture :
    PICTURE

## API Endpoints

POST /analyze
Analyzes a financial document or URL.

Request:
{
  "type": "pdf/url/text",
  "input": "http://newslink.com/article123",
  "query": "summarize risks and metrics"
}

Response:
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
