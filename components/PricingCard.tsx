"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import crownIconFilled from "../public/crown-icon-filled.svg";
import crownIcon from "../public/crown-icon.svg";
import lineThrough from "../public/line-through.svg";
import dotIcon from "../public/dot-icon.svg";
import dotIconWhite from "../public/dot-icon-white.svg";
import { afacad } from "@/app/fonts";

const PricingCard = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-10 md:mt-15 mb-10 bg-[#DDDCFD] w-[300px] m-auto rounded-[58px] p-2.5">
        <span className={!isAnnual ? "text-black" : "text-gray-400"}>
          Monthly
        </span>
        <div
          className={`w-14 h-7 flex items-center bg-[#544DF2] rounded-full p-1 cursor-pointer transition-colors `}
          onClick={() => setIsAnnual(!isAnnual)}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
              isAnnual ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </div>
        <span className={isAnnual ? "text-black" : "text-gray-400"}>
          Annually
        </span>
      </div>

      <Carousel opts={{
    align: "start",
    loop: true,
  }} className="cards-con-mobile w-full max-w-sm md:hidden">
          <CarouselContent >
            <CarouselItem>
              <div className="card-1 flex flex-col w-[280px] m-auto h-[480px] bg-[#FAFAFF] rounded-[20px] px-[30px] py-[25px]">
          <div className="header flex items-center gap-4">
            <Image
              src={crownIconFilled}
              alt="crown-icon"
              className="w-[30] h-[25px]"
            />
            <h1
              className={`${afacad.className} text-[20px] font-bold text-[#544DF2]`}
            >
              Free
            </h1>
          </div>
          <span className="text-3xl font-semibold text-[#544DF2] mt-3 mb-4">
            $0
          </span>
          <button className="text-[#544DF2] px-5 py-2.5 border-2 border-[#544DF2] rounded-[49px]">
            Get started
          </button>
          <p className="text-[12px] mt-4">
            For individuals just getting started with few bills
          </p>
          <Image
            src={lineThrough}
            alt="straight-line"
            className="w-full mt-4 mb-4"
          />
          <h1 className={`${afacad.className} text-[16px] mb-3`}>
            <span className="text-[18px] font-semibold">Features:</span> all free
            features, plus.
          </h1>

          <div
            className={`${afacad.className} features-list flex flex-col gap-5`}
          >
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Track Up to % active bills</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Basic in-app reminders</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Dashboard view</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Manual bill entry</span>
            </div>
          </div>
        </div>
            </CarouselItem>
            <CarouselItem>
              <div className="card-2 flex flex-col w-[280px] m-auto h-[480px] bg-[#544DF2] text-[#FFFFFF] rounded-[20px] px-[30px] py-[25px]">
          <div className="header flex items-center gap-4">
            <Image
              src={crownIcon}
              alt="crown-icon"
              className="w-[30] h-[25px]"
            />
            <h1
              className={`${afacad.className} text-[20px] font-bold text-[#FFFFFFF]`}
            >
              Pro
            </h1>
          </div>
          <span className="text-3xl font-semibold text-[#FFFFFF] mt-3 mb-4">
            {!isAnnual ? "$30" : "$300"}
          </span>
          <button className="text-[#544DF2] px-5 py-2.5  bg-[#FFFFFF] rounded-[49px]">
            Go Pro
          </button>
          <p className="text-[12px] mt-4">
            Students, Proffesionals, and individual with multiple bills.
          </p>
          <Image
            src={lineThrough}
            alt="straight-line"
            className="w-full mt-4 mb-4"
          />
          <h1 className={`${afacad.className} text-[16px] mb-3`}>
            <span className="text-[18px] font-semibold">Features:</span> all free
            features, plus.
          </h1>

          <div
            className={`${afacad.className} features-list flex flex-col gap-5`}
          >
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[14px]">Unlimited bills and subscriptions</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[14px]">Email reminders</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[14px]">Payment calendar view</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[14px]">Basic spending totals</span>
            </div>
          </div>
        </div>
            </CarouselItem>
            <CarouselItem>
              <div className="card-3 flex flex-col w-[280px] m-auto h-[480px] bg-[#FAFAFF] rounded-[20px] px-[30px] py-[25px]">
          <div className="header flex items-center gap-4">
            <Image
              src={crownIconFilled}
              alt="crown-icon"
              className="w-[30] h-[25px]"
            />
            <h1
              className={`${afacad.className} text-[20px] font-bold text-[#544DF2]`}
            >
              Elite
            </h1>
          </div>
          <span className="text-3xl font-semibold text-[#544DF2] mt-3 mb-4">
            {!isAnnual ? '$60' : '$600'}
          </span>
          <button className="text-[#544DF2] px-5 py-2.5 border-2 border-[#544DF2] rounded-[49px]">
            Join elite
          </button>
          <p className="text-[12px] mt-4">
            Families or roomates managing shared expenses
          </p>
          <Image
            src={lineThrough}
            alt="straight-line"
            className="w-full mt-4 mb-4"
          />
          <h1 className={`${afacad.className} text-[16px] mb-3`}>
            <span className="text-[18px] font-semibold">Features:</span> all Pro
            features, plus.
          </h1>

          <div
            className={`${afacad.className} features-list flex flex-col gap-5`}
          >
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Shared bill management</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">User permissions</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Shared payment calendar</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[14px]">Add more users</span>
            </div>
          </div>
        </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="ml-15" />
          <CarouselNext className="mr-15"/>
        </Carousel>

      <div className="hidden cards-con-desktop md:flex justify-center items-center ">
        <div className="card-1 flex flex-col w-[400px] h-[580px] bg-[#FAFAFF] rounded-[20px] p-9">
          <div className="header flex items-center gap-4">
            <Image
              src={crownIconFilled}
              alt="crown-icon"
              className="w-[35] h-[30px]"
            />
            <h1
              className={`${afacad.className} text-[24px] font-bold text-[#544DF2]`}
            >
              Free
            </h1>
          </div>
          <span className="text-5xl font-semibold text-[#544DF2] mt-4 mb-4">
            $0
          </span>
          <button className="text-[#544DF2] px-[30px] py-[15px] border-2 border-[#544DF2] rounded-[49px]">
            Get started
          </button>
          <p className="text-[16px] mt-6">
            For individuals just getting started with few bills
          </p>
          <Image
            src={lineThrough}
            alt="straight-line"
            className="w-full mt-6 mb-6"
          />
          <h1 className={`${afacad.className} text-[16px] mb-3`}>
            <span className="text-[18px] font-semibold">Features:</span> all free
            features, plus.
          </h1>

          <div
            className={`${afacad.className} features-list flex flex-col gap-5`}
          >
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Track Up to % active bills</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Basic in-app reminders</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Dashboard view</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Manual bill entry</span>
            </div>
          </div>
        </div>

        <div className="card-2 flex flex-col w-[400px] h-[620px] bg-[#544DF2] rounded-[20px] p-9">
          <div className="header flex items-center gap-4">
            <Image
              src={crownIcon}
              alt="crown-icon"
              className="w-[40] h-[35px]"
            />
            <h1
              className={`${afacad.className} text-[26px] font-bold text-[#FFFFFF] `}
            >
              Pro
            </h1>
          </div>
          <span className="text-[50px] font-semibold text-[#FFFFFF]  mt-4 mb-4">
            {!isAnnual ? "$30" : "$300"}
          </span>
          <button className="text-[#544DF2] px-[30px] py-[17px]  bg-[#FFFFFF] rounded-[49px]">
            Go Pro
          </button>
          <p className="text-[18px] mt-6 text-[#FFFFFF] font-light ">
            Students, Proffesionals, and individual with multiple bills.
          </p>
          <Image
            src={lineThrough}
            alt="straight-line"
            className="w-full mt-6 mb-6"
          />
          <h1
            className={`${afacad.className} text-[16px] mb-3 text-[#FFFFFF] `}
          >
            <span className="text-[18px] font-semibold">Features:</span> all free
            features, plus.
          </h1>

          <div
            className={`${afacad.className} features-list flex flex-col gap-5 text-[#FFFFFF] `}
          >
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[16px]">
                Unlimited bills and subscriptions
              </span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[16px]">Email reminders</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[16px]">Payment calendar view</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIconWhite} alt="dot-icon" />
              <span className="text-[16px]">Basic spending totals</span>
            </div>
          </div>
        </div>

        <div className="card-3 flex flex-col w-[400px] h-[580px] bg-[#FAFAFF] rounded-[20px] p-9">
          <div className="header flex items-center gap-4">
            <Image
              src={crownIconFilled}
              alt="crown-icon"
              className="w-[35] h-[30px]"
            />
            <h1
              className={`${afacad.className} text-[24px] font-bold text-[#544DF2]`}
            >
              Elite
            </h1>
          </div>
          <span className="text-5xl font-semibold text-[#544DF2] mt-4 mb-4">
            {!isAnnual ? "$60" : "$600"}
          </span>
          <button className="text-[#544DF2] px-[30px] py-[15px] border-2 border-[#544DF2] rounded-[49px]">
            Join elite
          </button>
          <p className="text-[16px] mt-6">
            Families or roomates managing shared expenses
          </p>
          <Image
            src={lineThrough}
            alt="straight-line"
            className="w-full mt-6 mb-6"
          />
          <h1 className={`${afacad.className} text-[16px] mb-3`}>
            <span className="text-[18px] font-semibold">Features:</span> all Pro
            features, plus.
          </h1>

          <div
            className={`${afacad.className} features-list flex flex-col gap-5`}
          >
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Shared bill management</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">User permissions</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Shared payment calendar</span>
            </div>
            <div className="features-list-item flex gap-3 ">
              <Image src={dotIcon} alt="dot-icon" />
              <span className="text-[16px]">Add more users</span>
            </div>
          </div>
        </div>

        {/* <div className="card-2 w-[477px] h-[856.6px] bg-[#544DF2] rounded-[22.34px] p-[40.22px]"></div>
            <div className="card-3 w-[427px] h-[762px] bg-[#FAFAFF] rounded-[20px] p-[36px]"></div> */}
      </div>
    </div>
  );
};

export default PricingCard;
