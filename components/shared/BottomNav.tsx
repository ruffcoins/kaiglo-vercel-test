"use client";

import { bottomNavMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export interface BottomNavProps {
  allowCTA: boolean;
}

const BottomNav = ({ allowCTA }: BottomNavProps) => {
  const pathname = usePathname();

  return (
    <div
      className="lg:hidden fixed bottom-0 right-0 left-0 bg-white grid grid-cols-4 rounded-t-2xl overflow-x-hidden gap-3 py-2"
      style={{ boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="flex flex-col col-span-4">
        {allowCTA && (
          <div className="grid grid-cols-2 justify-between p-5 space-x-3">
            <Button
              variant="primary"
              className="bg-kaiglo_brand-base h-12 text-white rounded-full px-8 py-3 uppercase font-medium"
            >
              Buy Now
            </Button>

            <Button
              variant="accent"
              className="text-black rounded-full h-12 uppercase font-medium bg-kaiglo_accent-100"
            >
              Add to Cart
            </Button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-x-6 px-4">
          {bottomNavMenu.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-1 cursor-pointer",
                (pathname === item.link ||
                  (pathname.includes("/app/") && item.title === "Account") ||
                  (pathname.includes("/product/") &&
                    item.title === "Category")) &&
                  "bg-kaiglo_success-100 rounded-lg",
              )}
            >
              <Image
                src={
                  pathname === item.link
                    ? item.activeIcon
                    : pathname.includes("/app/") && item.title === "Account"
                      ? item.activeIcon
                      : pathname.includes("/product/") &&
                          item.title === "Category"
                        ? item.activeIcon
                        : item.inactiveIcon
                }
                alt={`${item.title} navigation icon`}
                className="w-6 h-6"
                width={24}
                height={24}
              />

              <span
                className={cn(
                  pathname === item.link
                    ? "text-kaiglo_brand-base font-medium"
                    : pathname.includes("/app/") && item.title === "Account"
                      ? "text-kaiglo_brand-base font-medium"
                      : pathname.includes("/product/") &&
                          item.title === "Category"
                        ? "text-kaiglo_brand-base font-medium"
                        : "text-kaiglo_grey-placeholder font-normal",
                  "text-[10px]",
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BottomNav;
