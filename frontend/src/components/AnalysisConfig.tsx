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

const AnalysisConfig = () => {
  return (
    <>
      <div className="flex flex-col border-b-2">
        <h1 className="text-xl font-bold mb-4">Analysis Configuration</h1>
        <div className="flex justify-between mb-6">
          <div>
            <p className="font-semibold mb-2">Analysis Type</p>
            <Select defaultValue="comprehensive-review">
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
            <Select defaultValue="general-overview">
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
            placeholder="e.g. What are the primary headwinds mentioned for Q4"
          />
        </div>
      </div>

      <div className="flex flex-row-reverse mt-6 mr-4">
        <button className="bg-black text-white rounded-xl font-semibold py-2 px-4 w-3/7">
          <Activity className="inline mr-2" size={18} />
          Generate Analysis
        </button>
      </div>
    </>
  );
};

export default AnalysisConfig;
