
import AnalysisConfig from "./components/AnalysisConfig";
import ExecutiveSummary from "./components/ExecutiveSummary";
import GrowthOpportunities from "./components/GrowthOpportunities";
import KeyMetrics from "./components/KeyMetrics";
import LeftNav from "./components/layout/LeftNav";
import TopBar from "./components/layout/TopBar";
import ProTips from "./components/ProTips";
import RecentAnalysis from "./components/RecentAnalysis";
import RiskFactors from "./components/RiskFactors";
import SourceMaterial from "./components/SourceMaterial";

// interface AnalysisResult {
//   summary: string;
//   sentiment: "positive" | "negative" | "neutral" | string;
//   risk_factors?: string[];
//   opportunities?: string[];
//   key_metrics?: Record<string, string>;
//   confidence_score?: number;
//   sources_used?: number;
// }

function App() {
  // const [result, setResult] = useState<AnalysisResult | null>(null);
  // const [input, setInput] = useState({
  //   type: "",
  //   url: "",
  //   query: "",
  // });

  // async function handleAnalyze() {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/analyze", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         type: input.type,
  //         input: input.url,
  //         query: input.query || undefined,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(await response.text());
  //     }

  //     const data = await response.json();
  //     setResult(data);
  //   } catch (error) {
  //     console.error("Failed to analyze documents", error);
  //   }
  // }

  return (
    <div className="h-screen flex overflow-hidden">
      <LeftNav />

      <div className="flex flex-col flex-1 lg:w-4/5 md:w-3/4 sm:w-2/3">
        <TopBar />

        <div id="body" className="flex-1 overflow-auto">
          <div
            id="input-body"
            className="grid grid-cols-7 grid-rows-10 gap-7 p-10"
          >
            <div className="col-span-7 rows-span-1">
              <h1 className="text-3xl font-bold mb-2">Analyze Document</h1>
              <p className="text-gray-500">
                Upload financial reports or paste text to generate AI-powered
                insights, risk assessments, and key metrics.
              </p>
            </div>

            <div
              id="source-material"
              className="col-start-1 col-span-5 row-span-5 p-5 shadow-xl rounded-2xl border border-gray-400"
            >
              <SourceMaterial />
            </div>
            <div
              id="pro-tips"
              className="bg-[#101828] col-start-6 col-span-2 row-start-2 row-span-4 p-6 shadow-xl rounded-2xl"
            >
              <ProTips />
            </div>
            <div
              id="analysis-config"
              className="shadow-xl rounded-2xl col-start-1 col-span-5 row-span-4 p-5 border border-gray-400"
            >
              <AnalysisConfig />
            </div>
            <div
              id="recent-analysis"
              className="shadow-xl rounded-2xl col-start-6 col-span-2 row-start-6 row-span-5 p-5 border border-gray-400"
            >
              <RecentAnalysis />
            </div>
          </div>

          <div
            id="analysis-body"
            className="grid grid-cols-7 grid-rows-11 gap-7 py-4 px-10"
          >
            <div className="col-span-7 row-span-1 flex justify-between mx-2 px-4">
              <h1 className="text-2xl font-bold">Analysis Results</h1>
              <div className="space-x-4 ">
                <button className="border-2 border-gray-300 font-semibold hover:bg-slate-200 px-2 py-1 rounded-xl">
                  Export PDF
                </button>
                <button className="border-2 border-gray-300 font-semibold hover:bg-slate-200 px-2 py-1 rounded-xl">
                  Share
                </button>
              </div>
            </div>

            <div
              id="executive-summary"
              className="col-start-1 col-span-5 row-span-6 p-5 shadow-xl rounded-2xl border border-gray-400 border-l-4 border-l-black flex flex-col"
            >
              <ExecutiveSummary />
            </div>
            <div
              id="key-metrics"
              className="col-start-6 col-span-2 row-span-6 p-5 shadow-xl border border-gray-400 rounded-2xl "
            >
              <KeyMetrics />
            </div>
            <div
              id="risk-factors"
              className="col-start-1 col-span-3 row-span-5 p-5 shadow-xl border border-gray-400 rounded-2xl "
            >
              <RiskFactors />
            </div>
            <div
              id="growth-opportunities"
              className="col-start-4 col-span-4 row-span-5 p-5 shadow-xl border border-gray-400 rounded-2xl "
            >
              <GrowthOpportunities />
            </div>
          </div>
        </div>
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

{
  /* <div className="flex flex-col">
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
        </div> */
}