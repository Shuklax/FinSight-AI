import { useResultStore } from "../store/store";

const ExecutiveSummary = () => {
  const { summary, sentiment, confidenceScore, sourcesUsed } = useResultStore();
  console.log(summary);
  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-lg">Executive Summary</h1>
        <p className="text-xs font-semibold text-red-500 px-1 rounded-xl content-center bg-red-100">
          {sentiment} Sentiment
        </p>
      </div>

      <div className="space-y-2 text-gray-500 text mt-2 mb-4">
        {summary.flatMap((paragraph, pIndex) =>
          paragraph
            .split(".")
            .map((sentence) => sentence.trim())
            .filter(Boolean) // remove empty strings
            .map((sentence, sIndex) => (
              <p key={`${pIndex}-${sIndex}`}>{sentence}.</p>
            ))
        )}
      </div>

      <div className="flex mt-6 ml-4 justify-around">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500">
            CONFIDENCE SCORE
          </p>
          <p className="text-3xl font-bold">{confidenceScore*100}%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500">DATA SOURCES</p>
          <p className="text-3xl font-bold inline mr-2">{sourcesUsed}</p>
          <span className="text-sm text-slate-500">Citations Found</span>
        </div>
      </div>
    </>
  );
};

export default ExecutiveSummary;
