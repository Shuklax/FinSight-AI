

const ExecutiveSummary = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-lg">Executive Summary</h1>
        <p className="text-xs font-semibold text-red-500 px-1 rounded-xl content-center bg-red-100">Positive Sentiment</p>
      </div>

      <div className="space-y-2 text-gray-500 text mt-2 mb-4">
        <p>The company reported strong Q3 results, beating analyst expectations on both top and bottom lines. Revenue growth accelerated to 15% YoY, driven by robust demand in the cloud segment. Management raised full-year guidance, citing improved operational efficiency and a healthy deal pipeline.</p>
        <p>Key strategic initiatives are gaining traction, particularly the expansion into enterprise AI services. However, foreign exchange headwinds remain a concern for international markets.</p>
      </div>

      <div className="flex mt-6 ml-4 justify-around">
        <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-500">CONFIDENCE SCORE</p>
            <p className="text-3xl font-bold">94%</p>
        </div>
        <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-500">DATA SOURCES</p>
            <p className="text-3xl font-bold inline mr-2">12</p><span className="text-sm text-slate-500">Citations Found</span>           
        </div>
      </div>
    </>
  )
}

export default ExecutiveSummary
