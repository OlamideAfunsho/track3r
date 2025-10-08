import React from "react";
import Image from "next/image";
import layoutDashboardIcon from "../public/layout-dashboard.svg";
import bellRingIcon from "../public/bell-ring.svg";
import calendarIcon from "../public/calendar-arrow-up.svg";
import chartLineIcon from "../public/chart-line.svg";

const FeaturesCon = () => {
  return (
    <div className="features-con flex flex-col gap-4 w-full md:w-2/4 m-auto mt-10">
      <div className="feature-con flex items-center justify-evenly w-[230px] h-[70px] rounded-[124px] shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]">
        <Image src={layoutDashboardIcon} width={60} alt="dashboard-icon " />
        <h1 className="text-[#8B97B4] text-[14px] mr-2">
          All in One Dashboard
        </h1>
      </div>

      <div className="feature-con self-end flex items-center justify-evenly w-[230px] h-[70px] rounded-[124px] shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]">
        <Image src={bellRingIcon} width={60} alt="bell-icon" />
        <h1 className="text-[#8B97B4] text-[14px] mr-2">
          Custom Reminders
        </h1>
      </div>

      <div className="feature-con flex items-center justify-evenly w-[230px] h-[70px] rounded-[124px] shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]">
        <Image src={calendarIcon} width={60} alt="calendar-icon" />
        <h1 className="text-[#8B97B4] text-[14px] mr-2">
          Payment Calendar
        </h1>
      </div>

      <div className="feature-con self-end flex items-center justify-evenly w-[230px] h-[70px] rounded-[124px] shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]">
        <Image src={chartLineIcon} width={60} alt="chartline-icon" />
        <h1 className="text-[#8B97B4] text-[14px] mr-2">
          Spending Insights
        </h1>
      </div>
    </div>
  );
};

export default FeaturesCon;
