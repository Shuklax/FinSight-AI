import { useResultStore } from "../store/store";
import MetricRow from "./MetricRow";

const METRIC_CONFIG = [
  { key: "revenue", label: "Revenue" },
  { key: "eps", label: "EPS" },
  { key: "op_margin", label: "Op. Margin" },
  { key: "free_cash_flow", label: "Free Cash Flow" },
  { key: "profit", label: "Net Profit" },
  { key: "guidance", label: "Guidance" },
  { key: "debt", label: "Total Debt" },
  { key: "cash_flow", label: "Cash Flow" },
] as const;

const KeyMetrics = () => {
  const { keyMetrics } = useResultStore();

  // Guard clause if keyMetrics is undefined or empty
  if (
    keyMetrics === null ||
    !keyMetrics ||
    Object.keys(keyMetrics).length === 0
  ) {
    return (
      <div className="p-5 shadow-xl border border-gray-400 rounded-2xl">
        <h1 className="font-semibold text-lg">Key Metrics</h1>
        <p className="text-gray-500 mt-4 text-sm">No metrics available.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-semibold text-lg">Key Metrics</h1>
      <div className="mt-4 divide-y">
        {METRIC_CONFIG.map(({ key, label }) => {
          const metric = keyMetrics[key];
          if (!metric) return null;
          return <MetricRow key={key} label={label} metric={metric} />;
        })}
      </div>
    </>
  );
};

export default KeyMetrics;
