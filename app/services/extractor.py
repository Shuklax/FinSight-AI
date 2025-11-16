import requests
import io
from typing import Optional
from bs4 import BeautifulSoup
import pdfplumber
from pypdf2 import PdfReader

class TextExtractor:
    """Extracts text from PDFs, URLs, or plain text"""
    
    @staticmethod
    def extract(input_type: str, input_data: str) -> str:
        """
        Extract text based on input type
        
        Args:
            input_type: 'pdf', 'url', or 'text'
            input_data: PDF URL, web URL, or plain text
            
        Returns:
            Extracted text string
        """
        if input_type == "text":
            return input_data
        elif input_type == "url":
            return TextExtractor._extract_from_url(input_data)
        elif input_type == "pdf":
            return TextExtractor._extract_from_pdf_url(input_data)
        else:
            raise ValueError(f"Unsupported input type: {input_type}")
    
    @staticmethod
    def _extract_from_url(url: str) -> str:
        """Extract text from web URL"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style", "nav", "footer", "header"]):
                script.decompose()
            
            # Get text
            text = soup.get_text()
            
            # Clean up whitespace
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = ' '.join(chunk for chunk in chunks if chunk)
            
            return text
        except Exception as e:
            raise Exception(f"Failed to extract from URL: {str(e)}")
    
    @staticmethod
    def _extract_from_pdf_url(pdf_url: str) -> str:
        """Download and extract text from PDF URL"""
        try:
            # Download PDF
            response = requests.get(pdf_url, timeout=60)
            response.raise_for_status()
            
            pdf_file = io.BytesIO(response.content)
            
            # Try pdfplumber first (better for tables)
            try:
                text_parts = []
                with pdfplumber.open(pdf_file) as pdf:
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text_parts.append(page_text)
                
                if text_parts:
                    return "\n\n".join(text_parts)
            except:
                pass
            
            # Fallback to PyPDF2
            pdf_file.seek(0)
            reader = PdfReader(pdf_file)
            text_parts = []
            
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    text_parts.append(text)
            
            if not text_parts:
                raise Exception("No text could be extracted from PDF")
            
            return "\n\n".join(text_parts)
            
        except Exception as e:
            raise Exception(f"Failed to extract from PDF: {str(e)}")
    
    @staticmethod
    def clean_text(text: str) -> str:
        """Clean and normalize extracted text"""
        # Remove excessive whitespace
        text = ' '.join(text.split())
        
        # Remove common PDF artifacts
        text = text.replace('\x00', '')
        
        return text.strip()