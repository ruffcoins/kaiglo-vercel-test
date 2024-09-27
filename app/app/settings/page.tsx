"use client";

import dynamic from "next/dynamic";

const SettingsForm = dynamic(() => import("@/components/forms/SettingsForm"), {
  ssr: false,
  loading: () => (
    <div className="space-y-6 animate-pulse">
      <div className="w-full grid grid-cols-12">
        <div className="flex justify-center items-center col-span-1">
          <span className="border rounded-full p-8 bg-gray-300">
            <span className="min-w-6 min-h-6 bg-gray-400 rounded-full"></span>
          </span>
        </div>

        <div className="grid grid-cols-2 col-span-11 gap-6 ml-6">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded"></div>

          <div className="relative">
            <span className="absolute bg-gray-300 text-base w-[72px] rounded-l-lg ml-[1px] h-[46px] flex justify-center items-center border-0 mt-[1px]"></span>
            <span className="h-12 bg-gray-300 rounded pl-20"></span>
          </div>
        </div>

        <div className="w-fit font-medium rounded-full px-8 py-3 ml-32 mt-10 bg-gray-300"></div>
      </div>
    </div>
  ),
});

const BackButton = dynamic(() => import("@/components/shared/BackButton"), {
  ssr: false,
  loading: () => <div className="w-6 h-6 lg:hidden"></div>,
});

const Settings = () => {
  return (
    <>
      <div className="space-y-4 overflow-hidden py-14 lg:py-0">
        <div className="lg:relative fixed top-0 bg-white w-full flex lg:space-x-2 items-center lg:h-auto h-[60px] justify-between px-5 lg:drop-shadow-none drop-shadow lg:px-0 z-10">
          <BackButton />
          <h1 className="text-xl font-medium lg:text-start text-center">
            Account Settings
          </h1>
          <div className="w-6 h-6 lg:hidden block"></div>
        </div>

        <SettingsForm />
      </div>
    </>
  );
};
export default Settings;
