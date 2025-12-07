import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MetricRow = ({ label, metric }: { label: string; metric: any }) => {
  if (!metric) return null;

  const getIcon = () => {
    switch (metric.direction) {
      case "up":
        return <TrendingUp size={18} className="inline mr-0.5" />;
      case "down":
        return <TrendingDown size={18} className="inline mr-0.5" />;
      default:
        return <Minus size={18} className="inline mr-0.5" />;
    }
  };

  const getColor = () => {
    switch (metric.direction) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-[2fr,1fr,1fr] items-center py-1 border-b last:border-0 border-gray-100">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-sm text-right font-medium">{metric.value || "N/A"}</p>
      <p className={`${getColor()} text-right text-xs font-semibold`}>
        {getIcon()}
        {metric.change || "0%"}
      </p>
    </div>
  );
};

export default MetricRow;
