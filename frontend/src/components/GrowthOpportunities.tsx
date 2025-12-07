import { DollarSign } from 'lucide-react';
import { useResultStore } from '../store/store';

const GrowthOpportunities = () => {
  const {opportunities} = useResultStore();
  console.log(opportunities)
  return (
    <>
      <h1 className="font-semibold text-lg">
        <DollarSign className="text-yellow-500 inline mr-2" />
        Growth Opportunity
      </h1>
      <div className="m-4">
        <ul className="marker:text-yellow-500 list-disc text-gray-500 space-y-2">
          {opportunities.flatMap((paragraph, pIndex) =>
          paragraph
            .split(".")
            .map((sentence) => sentence.trim())
            .filter(Boolean) // remove empty strings
            .map((sentence, sIndex) => (
              <li key={`${pIndex}-${sIndex}`}>{sentence}.</li>
            ))
        )}
        </ul>
      </div>
    </>
  )
}

export default GrowthOpportunities
