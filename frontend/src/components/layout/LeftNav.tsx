import { LayoutDashboard, ChartPie, History, FileText, Settings, Wallet } from 'lucide-react';
import NavBarButton from '../ui/NavBarButton';

const LeftNav = () => {
  return (
    <div className="border border-r-2 items-start lg:w-1/6 md:w-1/4 sm:w-1/3">
      <div className='border border-b-2'>
        <h1 className="text-2xl font-bold m-4">FinSight AI</h1>
      </div>

      <div className="flex flex-col h-screen pl-1 pt-2 pr-5">
        <div id="menu_1" className="flex flex-col items-start text-left">
          <p className='ml-3 mt-4 mb-2 text-sm font-semibold text-gray-500'>Platform</p>
          <NavBarButton icon={LayoutDashboard} text="Dashboard" />
          <NavBarButton icon={FileText} text="Analyze document" />
          <NavBarButton icon={History} text="History" />
          <NavBarButton icon={ChartPie} text="Market Overview" />
        </div>
        <div id="menu_2" className="flex flex-col text-left items-start">
          <p className='ml-3 mt-5 mb-2 text-sm font-semibold text-gray-500'>Settings</p>
          <NavBarButton icon={Settings} text="General Settings" />
          <NavBarButton icon={Wallet} text="Billings & Plan" />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
