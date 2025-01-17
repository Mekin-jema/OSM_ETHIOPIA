import { useState } from "react";
import Sidebar from "./Sidebar";
import Board from "../Pages/Board";
import ApiClient from "../Pages/ApiClients";
import AccountSettings from "../Pages/AccountSettings";
import Map from "../Pages/Map";
import Billing from "../Pages/Billing";
import { Premium } from "../Pages/Premium";
import Routing from "../Pages/Routing";
// import MapComponent from "../Pages/Routing";
import MapWithGeocoder from "../Pages/Geocoding";
import MapComponent from "../Pages/OSRM";
import Demo from "../Pages/Demo";

export const Dashboard = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(true);
  return (
    <div className=" w-full h-[982px] bg-white flex ">
      <div
        className={` ${
          open ? "w-[300px] " : "w-[118px] "
        } ml-[19px] mt-[12px] h-[953px]`}
      >
        <Sidebar
          active={active}
          setActive={setActive}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <div className={`flex-1 h-[953px] w-[98%] m-0 `}>
        {/* {active === 0 && <Demo />} */}
        {active === 1 && <MapComponent />}

        {active === 2 && <ApiClient />}
        {active === 3 && <AccountSettings />}
        {active === 4 && <Billing />}
        {active === 5 && <Premium />}
      </div>
    </div>
  );
};

export default Dashboard;
