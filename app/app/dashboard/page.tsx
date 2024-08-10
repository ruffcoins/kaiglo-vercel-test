"use client";

import DesktopPage from "@/components/dashboard/DesktopPage";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MobilePage = dynamic(() => import("@/components/dashboard/MobilePage"), {
  ssr: false,
});

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      handleResize(); // Check on initial render
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      <DesktopPage />
      {isMobile && <MobilePage />}
    </>
  );
};

export default Dashboard;
