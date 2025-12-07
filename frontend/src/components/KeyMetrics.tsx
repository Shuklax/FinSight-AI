import { TrendingUp, TrendingDown } from "lucide-react";

const KeyMetrics = () => {
  return (
    <>
      <h1 className="font-semibold text-lg">Key Metrics</h1>

      <div className="mt-4 divide-y">
        {/* Header not needed, each row is a 3-col grid */}
        <div className="grid grid-cols-[2fr,1fr,1fr] items-center py-1">
          <p className="text-sm font-semibold">Revenue</p>
          <p className="text-sm text-right">$4.2B</p>
          <p className="text-yellow-600 text-right">
            <TrendingUp size={18} className="inline mr-0.5" />
            15%
          </p>
        </div>

        <div className="grid grid-cols-[2fr,1fr,1fr] items-center py-1">
          <p className="text-sm font-semibold">EPS</p>
          <p className="text-sm text-right">$1.24</p>
          <p className="text-yellow-600 text-right">
            <TrendingUp size={18} className="inline mr-0.5" />
            8%
          </p>
        </div>

        <div className="grid grid-cols-[2fr,1fr,1fr] items-center py-1">
          <p className="text-sm font-semibold">Op. Margin</p>
          <p className="text-sm text-right">22.5%</p>
          <p className="text-red-600 text-right">
            <TrendingDown size={18} className="inline mr-0.5" />
            1.2%
          </p>
        </div>

        <div className="grid grid-cols-[2fr,1fr,1fr] items-center py-1">
          <p className="text-sm font-semibold">Free Cashflow</p>
          <p className="text-sm text-right">$850M</p>
          <p className="text-right">-</p>
        </div>
      </div>
    </>
  );
};

export default KeyMetrics;
