"use client";

import DesktopPage from "@/components/dashboard/DesktopPage";
import MobilePage from "@/components/dashboard/MobilePage";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // console.log(`Window width: ${window.innerWidth}, isMobile: ${window.innerWidth <= 768}`);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <DesktopPage />
      {isMobile && <MobilePage />}
    </>
  );
};

export default Dashboard;
