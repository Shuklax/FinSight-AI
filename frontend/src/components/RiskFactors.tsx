import { CircleAlert } from "lucide-react";

const RiskFactors = () => {
  return (
    <>
      <h1 className="font-semibold text-lg">
        <CircleAlert className="text-yellow-500 inline mr-2" />
        Risk Factors
      </h1>
      <div className="m-4">
        <ul className="marker:text-yellow-500 list-disc text-gray-500 space-y-2">
          <li>
            Supply chain constraints in the semiconductor division may impact Q4
            delivery timelines.
          </li>
          <li>
            Regulatory scrutiny regarding the pending acquisition could delay
            closing beyond expected timeframe.
          </li>
          <li>
            Currency fluctuations in APAC region posing 2-3% headwind to
            revenue.
          </li>
        </ul>
      </div>
    </>
  );
};

export default RiskFactors;
