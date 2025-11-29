import { PanelLeftDashed, SearchIcon, Bell, Moon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

const TopBar = () => {
  return (
    <div className="w-full border border-b-2 z-10 shadow-lg flex justify-between align-middle text-center">
      <div className="flex m-3">
        <div className="border-r-2 pt-2 pb-2 pl-2 pr-4 mr-3">
          <PanelLeftDashed/>
        </div>
        <div className="ml-4 pl-3">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search reports, tickers or analysis..." />
            
            <InputGroupAddon align="inline-end">
              <InputGroupButton>Search</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div className="flex items-center">
        <Bell className="text-gray-400 size-5 mr-6"/>
        <Moon className="text-gray-400 size-5 mr-5"/>
      </div>
    </div>
  );
};

export default TopBar;
