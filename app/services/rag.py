import os
from typing import List, Tuple
from app.services.extractor import TextExtractor
from app.services.embedder import Embedder
from app.services.vector_store import VectorStore
from app.services.llm_analyzer import LLMAnalyzer
from app.models.schemas import AnalyzeRequest, AnalyzeResponse

class RAGPipeline:
    """End-to-end RAG pipeline for financial document analysis"""
    
    def __init__(self):
        self.extractor = TextExtractor()
        self.embedder = Embedder()
        self.vector_store = VectorStore(dimension=1536)
        self.analyzer = LLMAnalyzer()
        
        # Load existing index if available
        self.vector_store.load()
        
        # Config
        self.chunk_size = int(os.getenv("CHUNK_SIZE", "1000"))
        self.chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "200"))
        self.top_k = 5  # Number of chunks to retrieve
    
    def process_document(self, request: AnalyzeRequest) -> AnalyzeResponse:
        """
        Full pipeline: Extract → Chunk → Embed → Store → Retrieve → Analyze
        
        Args:
            request: AnalyzeRequest with document info
            
        Returns:
            AnalyzeResponse with structured insights
        """
        
        # Step 1: Extract text
        print(f"📄 Extracting text from {request.type}...")
        raw_text = self.extractor.extract(request.type, request.input)
        clean_text = self.extractor.clean_text(raw_text)
        
        if not clean_text or len(clean_text) < 50:
            raise ValueError("Extracted text is too short or empty")
        
        # Step 2: Chunk text
        print(f"✂️  Chunking text (size={self.chunk_size}, overlap={self.chunk_overlap})...")
        chunks = self.embedder.chunk_text(
            clean_text,
            chunk_size=self.chunk_size,
            overlap=self.chunk_overlap
        )
        print(f"   Created {len(chunks)} chunks")
        
        # Step 3: Generate embeddings
        print(f"🧮 Generating embeddings...")
        embeddings = self.embedder.embed_batch(chunks)
        
        # Step 4: Store in vector DB
        print(f"💾 Storing vectors in FAISS...")
        # Clear previous session data (for fresh analysis each time)
        # You can comment this out to keep accumulating documents
        self.vector_store.clear()
        self.vector_store.add_vectors(embeddings, chunks)
        
        # Step 5: Retrieve relevant chunks
        print(f"🔍 Retrieving top {self.top_k} relevant chunks...")
        query_embedding = self.embedder.embed_text(request.query)
        results = self.vector_store.search(query_embedding, top_k=self.top_k)
        
        # Extract just the texts (discard distances)
        context_chunks = [text for text, _ in results]
        
        if not context_chunks:
            raise ValueError("No relevant context found")
        
        # Step 6: LLM Analysis
        print(f"🤖 Analyzing with LLM...")
        response = self.analyzer.analyze(context_chunks, request.query)
        
        print(f"✅ Analysis complete!")
        return response
    
    def get_stats(self) -> dict:
        """Get pipeline statistics"""
        return {
            "vector_store": self.vector_store.get_stats(),
            "embedding_model": self.embedder.model,
            "llm_model": self.analyzer.model,
            "chunk_config": {
                "size": self.chunk_size,
                "overlap": self.chunk_overlap
            }
        }