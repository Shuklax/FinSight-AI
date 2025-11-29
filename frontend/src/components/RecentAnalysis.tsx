

const RecentAnalysis = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-xl mb-8">Recent Analysis</h1>
        <div>
          <div className="border-b-2 border-gray-300 mb-4 p-3">
            <p className="font-semibold">NVDA_Q3_FY24.pdf</p>
            <p className="text-sm text-gray-500 font-medium">2 hours ago</p>
          </div>
          <div className="border-b-2 border-gray-300 mb-4 p-3">
            <p className="font-semibold">TSLA_Earnings_Call.txt</p>
            <p className="text-sm text-gray-500 font-medium">Yesterday</p>
          </div>
          <div className="border-b-2 border-gray-300 mb-4 p-3">
            <p className="font-semibold">AAPL_10K_2023.pdf</p>
            <p className="text-sm text-gray-500 font-medium">2 days ago</p>
          </div>

          <div className="flex flex-1 justify-center content-center align-middle">
            <button className="pt-1 pb-1 pl-3 pr-3 w-full font-semibold text-slate-500 bg-gray-200 hover:bg-gray-300 hover:text-black rounded-xl align-middle">View History</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentAnalysis
