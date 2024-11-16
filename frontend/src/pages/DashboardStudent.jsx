import React, { useEffect, useState } from "react";
import StudnetImage from "../assets/logo.jpg";
import Sidebar from "../components/Sidebar";
const DashboardStudent = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");


  const sidebarItems = [
    {
      label: "Profile",
      onClick: () => handleTabClick("Profile"),
      bgColor: "bg_primary_color",
      textColor: "text-white",
    },
    {
      label: "Interest",
      onClick: () => handleTabClick("Interest"),
      bgColor: "bg_gray",
      textColor: "text-black",
    },
    {
      label: "Session",
      onClick: () => handleTabClick("Session"),
      bgColor: "bg_gray",
      textColor: "text-black",
    },
    {
      label: "Activities",
      onClick: () => handleTabClick("Activities"),
      bgColor: "bg_gray",
      textColor: "text-black",
    },
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    console.log(`${tab} clicked`);
  };

  useEffect(() => {
    console.log("Selected tab:", selectedTab);
  }, [selectedTab]); // Log whenever selectedTab changes


  return (
    <div className='w-full min-h-screen px-6"'>
      <div className="flex ">
        <aside className="w-[15%] h-[86vh] m-2  p-2  ">
          <div className="flex justify-center my-3 ">
            <img
              src={StudnetImage}
              alt="Student image"
              className="rounded-2xl "
            />
          </div>

          <Sidebar items={sidebarItems} />
        </aside>


        <div className="w-[85%] h-[86vh] m-2 rounded-2xl bg_light_primary_color p-4">
          {/* Student information */}

          <div className="my-2 px-4 grid gap-2">
            <h1 className="text-4xl font-bold">Aman Jain</h1>
            <span className="text-xl font-semibold">Student</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
