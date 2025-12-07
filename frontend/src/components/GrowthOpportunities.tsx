import { DollarSign } from 'lucide-react';

const GrowthOpportunities = () => {
  return (
    <>
      <h1 className="font-semibold text-lg">
        <DollarSign className="text-yellow-500 inline mr-2" />
        Growth Opportunity
      </h1>
      <div className="m-4">
        <ul className="marker:text-yellow-500 list-disc text-gray-500 space-y-2">
          <li>
            Expansion of AI-driven service tier showing 40% QoQ adoption rate among enterprise clients.


          </li>
          <li>
            Regulatory scrutiny regarding the pending acquisition could delay
            closing beyond expected timeframe.
          </li>
          <li>
            Untapped market potential in Latin America region with new localized product launch.
          </li>
        </ul>
      </div>
    </>
  )
}

export default GrowthOpportunities
