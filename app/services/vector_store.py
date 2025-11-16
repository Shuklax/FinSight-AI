import os
import numpy as np
import faiss
from typing import List, Tuple
import pickle

class VectorStore:
    """FAISS-based vector store for semantic search"""
    
    def __init__(self, dimension: int = 1536):
        """
        Initialize vector store
        
        Args:
            dimension: Embedding dimension (1536 for text-embedding-3-small)
        """
        self.dimension = dimension
        self.index = faiss.IndexFlatL2(dimension)  # L2 distance
        self.texts: List[str] = []  # Store original texts
        self.index_path = os.getenv("FAISS_INDEX_PATH", "./data/faiss_index")
        
        # Create directory if doesn't exist
        os.makedirs(self.index_path, exist_ok=True)
    
    def add_vectors(self, embeddings: List[List[float]], texts: List[str]):
        """
        Add vectors to the index
        
        Args:
            embeddings: List of embedding vectors
            texts: Corresponding text chunks
        """
        if len(embeddings) != len(texts):
            raise ValueError("Number of embeddings must match number of texts")
        
        # Convert to numpy array
        vectors = np.array(embeddings, dtype=np.float32)
        
        # Add to FAISS index
        self.index.add(vectors)
        
        # Store texts
        self.texts.extend(texts)
    
    def search(self, query_embedding: List[float], top_k: int = 5) -> List[Tuple[str, float]]:
        """
        Search for similar vectors
        
        Args:
            query_embedding: Query vector
            top_k: Number of results to return
            
        Returns:
            List of (text, distance) tuples
        """
        if self.index.ntotal == 0:
            return []
        
        # Convert to numpy array
        query_vector = np.array([query_embedding], dtype=np.float32)
        
        # Search
        distances, indices = self.index.search(query_vector, min(top_k, self.index.ntotal))
        
        # Return results
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx < len(self.texts):
                results.append((self.texts[idx], float(dist)))
        
        return results
    
    def save(self, name: str = "financial_docs"):
        """Save index and texts to disk"""
        index_file = os.path.join(self.index_path, f"{name}.index")
        texts_file = os.path.join(self.index_path, f"{name}.pkl")
        
        # Save FAISS index
        faiss.write_index(self.index, index_file)
        
        # Save texts
        with open(texts_file, 'wb') as f:
            pickle.dump(self.texts, f)
    
    def load(self, name: str = "financial_docs") -> bool:
        """Load index and texts from disk"""
        index_file = os.path.join(self.index_path, f"{name}.index")
        texts_file = os.path.join(self.index_path, f"{name}.pkl")
        
        try:
            if os.path.exists(index_file) and os.path.exists(texts_file):
                # Load FAISS index
                self.index = faiss.read_index(index_file)
                
                # Load texts
                with open(texts_file, 'rb') as f:
                    self.texts = pickle.load(f)
                
                return True
        except Exception as e:
            print(f"Failed to load index: {e}")
        
        return False
    
    def clear(self):
        """Clear the index and texts"""
        self.index = faiss.IndexFlatL2(self.dimension)
        self.texts = []
    
    def get_stats(self) -> dict:
        """Get index statistics"""
        return {
            "total_vectors": self.index.ntotal,
            "dimension": self.dimension,
            "total_texts": len(self.texts)
        }