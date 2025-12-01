import { useState } from "react";
import LeftNav from "./components/layout/LeftNav";

interface AnalysisResult {
  summary: string;
  sentiment: "positive" | "negative" | "neutral" | string;
  risk_factors?: string[];
  opportunities?: string[];
  key_metrics?: Record<string, string>;
  confidence_score?: number;
  sources_used?: number;
}

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [input, setInput] = useState({
    type: "",
    url: "",
    query: "",
  });

  async function handleAnalyze() {
    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: input.type,
          input: input.url,
          query: input.query || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Failed to analyze documents", error);
    }
  }

  return (
    <div className="flex items-start h-screen">
      <LeftNav />

      <div className="flex flex-col ">
        <p className="text-lg m-5">
          Analyze financial documents and extract key insights
        </p>
        <select
          className="text-black"
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value })}
        >
          <option value="">Select type</option>
          <option value="pdf">PDF</option>
          <option value="url">URL</option>
          <option value="text">Text</option>
        </select>
        <input
          type="text"
          placeholder="Enter the URL or text content"
          className="text-black m-1"
          value={input.url}
          onChange={(e) => setInput({ ...input, url: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter the query"
          className="text-black m-1"
          value={input.query}
          onChange={(e) => setInput({ ...input, query: e.target.value })}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleAnalyze}
        >
          Analyze
        </button>

        {result && (
          <div id="result" className="mt-4w-full max-w-xl text-left">
            <h2>Result</h2>
            <p>Summary {result.summary}</p>
            <p>Sentiment {result.sentiment}</p>
            <p>Risk Factors {(result.risk_factors || []).join(", ")}</p>
            <p>Opportunities {(result.opportunities || []).join(", ")}</p>

            <div>
              <strong>Key Metrics</strong>
              <pre>{JSON.stringify(result.key_metrics, null, 2)}</pre>
            </div>

            <p>Confidence Score: {result.confidence_score}</p>
            <p>Sources Used: {result.sources_used}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

//INPUTS:
// type: pdf, url, or text
// input: URL or text content
// query: Optional analysis query (default: general analysis)

//OUTPUTS:
// {
//   "summary": "string",
//   "sentiment": "positive",
//   "risk_factors": [
//     "string"
//   ],
//   "opportunities": [
//     "string"
//   ],
//   "key_metrics": {
//     "revenue": "string",
//     "profit": "string",
//     "eps": "string",
//     "guidance": "string",
//     "debt": "string",
//     "cash_flow": "string"
//   },
//   "confidence_score": 1,
//   "sources_used": 0
// }
