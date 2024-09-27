import Footer from "@/components/layouts/Homepage/Footer";
import DesktopHeader from "@/components/shared/headers/DesktopHeader";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen overflow-hidden">
      <DesktopHeader />

      <div className=" lg:mt-20">{children}</div>

      <Footer allowCTA={false} />
    </main>
  );
};
export default layout;
