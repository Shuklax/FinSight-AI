import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Activity } from "lucide-react";
import { useSourceMaterialStore } from "../store/store";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { runAnalysis } from "../services/analysisService";
import { cn } from "../lib/utils";

const AnalysisConfig = () => {
  const {
    analysisType,
    setAnalysisType,
    focusArea,
    setFocusArea,
    specificQuestion,
    setSpecificQuestion,
  } = useSourceMaterialStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAnalysis = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await runAnalysis();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate analysis";
      setError(errorMessage);
      console.error("analysis error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col border-b-2">
        <h1 className="text-xl font-bold mb-4">Analysis Configuration</h1>
        <div className="flex justify-between mb-6">
          <div>
            <p className="font-semibold mb-2">Analysis Type</p>
            <Select
              defaultValue="comprehensive-review"
              value={analysisType}
              onValueChange={setAnalysisType}
            >
              <SelectTrigger className="w-[190px]">
                <SelectValue placeholder="Comprehensive Review" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="comprehensive-review">
                    Comprehensive Review
                  </SelectItem>
                  <SelectItem value="executive-summary">
                    Executive Summary
                  </SelectItem>
                  <SelectItem value="risk-assessment">
                    Risk Assessment
                  </SelectItem>
                  <SelectItem value="financial-metrics">
                    Financial Metrics
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mr-32">
            <p className="font-semibold mb-2">Focus Area</p>
            <Select
              defaultValue="general-overview"
              value={focusArea}
              onValueChange={setFocusArea}
            >
              <SelectTrigger className="w-[190px]">
                <SelectValue placeholder="General Overview" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="general-overview">
                    General Overview
                  </SelectItem>
                  <SelectItem value="risk-&-revenue">Risk & Revenue</SelectItem>
                  <SelectItem value="profitability-&-margins">
                    Profitability & Margins
                  </SelectItem>
                  <SelectItem value="debt-&-liquidity">
                    Debt & Liquidity
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label className="font-semibold mb-2" htmlFor="specific-question">
            Specific Question (Optional)
          </Label>
          <Input
            type="text"
            id="specific-question"
            value={specificQuestion}
            placeholder="e.g. What are the primary headwinds mentioned for Q4"
            onChange={(e) => setSpecificQuestion(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-row-reverse mt-6 mr-4">
        <button
          onClick={handleGenerateAnalysis}
          disabled={isLoading}
          className={cn(
            "bg-black text-white rounded-xl font-semibold py-2 px-4 w-3/7",
            isLoading ? "bg-slate-800 cursor-not-allowed" : "hover:bg-slate-800"
          )}
        >
          {isLoading ? (
            <>
              <Spinner className="inline mr-2 mb-1" />
              Analyzing...
            </>
          ) : (
            <>
              <Activity className="inline mr-2" size={18} />
              Generate Analysis
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default AnalysisConfig;
