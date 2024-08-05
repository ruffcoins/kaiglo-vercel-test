"use client";

import AccountLayout from "@/components/layouts/AccountLayout";
import { Button } from "@/components/ui/button";
import { accountTabsMenu } from "@/constants/menu";
import { AccountLayoutProps } from "@/interfaces/layouts/accountLayout.interface";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logout from "@/public/images/logout.svg";
import BottomNav from "@/components/shared/BottomNav";

const Layout: React.FC<AccountLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const tabId = pathname.split("/")[2];
    setActiveTab(tabId);
  }, [pathname]);

  const handleTabClick = (tabId: string, link: string) => {
    setActiveTab(tabId);
    router.push(`${link}`);
  };

  return (
    <>
      <div className="hidden lg:block">
        <AccountLayout>
          <div className="flex fixed top-[170px] lg:right-8 lg:left-8 xl:right-14 xl:left-14 text-black overflow-y-hidden h-[calc(100vh-11rem)] space-x-4">
            <div className="flex flex-col justify-between px-6 py-8 bg-white lg:w-1/4 xl:w-1/5 rounded-xl">
              <div>
                <p className="font-medium uppercase">My Account</p>
                <ul className="mt-8 space-y-3">
                  {accountTabsMenu.map((tab) => (
                    <li
                      key={tab.id}
                      className={`rounded text-sm p-2 cursor-pointer 
                  ${
                    activeTab === tab.id
                      ? "bg-kaiglo_grey-disabled"
                      : "hover:bg-kaiglo_success-50"
                  }`}
                      onClick={() => handleTabClick(tab.id, tab.link)}
                    >
                      {tab.label}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                className="rounded-lg w-fit gap-x-1 hover:bg-kaiglo_grey-disabled"
              >
                <Image
                  src={Logout}
                  alt="logout icon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>Logout</span>
              </Button>
            </div>

            <div className="p-6 bg-white lg:w-3/4 xl:w-4/5 rounded-xl">
              {children}
            </div>
          </div>
        </AccountLayout>
      </div>

      <div className="lg:hidden bg-white min-h-screen lg:p-5 lg:py-12 pb-16">
        {children}
        <BottomNav allowCTA={false} />
      </div>
    </>
  );
};
export default Layout;
