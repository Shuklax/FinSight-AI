from fastapi import APIRouter, HTTPException
from app.models.schema import AnalyzeRequest, AnalyzeResponse, HealthResponse
from app.services.rag import RAGPipeline

router = APIRouter()

# Initialize RAG pipeline (singleton)
rag_pipeline = RAGPipeline()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_document(request: AnalyzeRequest):
    """
    Analyze a financial document using RAG pipeline
    
    - **type**: pdf, url, or text
    - **input**: URL or text content
    - **query**: Optional analysis query (default: general analysis)
    """
    try:
        result = rag_pipeline.process_document(request)
        return result
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check API and pipeline health"""
    try:
        stats = rag_pipeline.get_stats()
        
        return HealthResponse(
            status="healthy",
            faiss_index_loaded=stats["vector_store"]["total_vectors"] > 0,
            embedding_model=stats["embedding_model"],
            llm_model=stats["llm_model"]
        )
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Health check failed: {str(e)}")

@router.get("/stats")
async def get_stats():
    """Get detailed pipeline statistics"""
    try:
        return rag_pipeline.get_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))