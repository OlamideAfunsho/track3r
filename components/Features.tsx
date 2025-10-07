import React from "react";
import Image from "next/image";
import countriesIcon from "../public/countries-icon.svg";
import avatars from "../public/avatars.png";

const Features = () => {
  return (
    <div className="text-center w-3/4 m-auto mt-20 md:mt-28">
      <h1 className="text-5xl font-bold">
        <span className="text-[#929297]">Trusted by</span> Thousands of
        Organized Users
      </h1>
      <div className="flex flex-col md:flex-row mt-5 justify-center items-center gap-3 md:gap-8">
        <Image src={countriesIcon} alt="countries-icon" />

        <h2 className="flex items-center gap-6 text-[#525252]">
          <span className="text-[64px] font-bold text-[#544DF2]">50000+</span>{" "}
          Users Worldwide
        </h2>
      </div>

      <Image src={avatars} alt="avatars-stringed-together" className="w-2/3 m-auto" />
    </div>
  );
};

export default Features;
