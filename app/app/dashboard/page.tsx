import DesktopPage from "@/components/dashboard/DesktopPage";
import MobilePage from "@/components/dashboard/MobilePage";

const Dashboard = () => {
  return (
    <>
      <DesktopPage />
      {typeof window !== "undefined" && window.innerWidth <= 768 && (
        <MobilePage />
      )}
    </>
  );
};
export default Dashboard;
