"use client";

import Image from "next/image";
import OrderBox from "@/public/images/order-box.svg";
import Help from "@/public/images/help.svg";
import Coupon from "@/public/images/coupon.svg";
import Wishlist from "@/public/images/empty-heart.svg";
import Link from "next/link";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { mobileDashboardMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutDialog from "../auth/dialogs/LogoutDialog";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import Avatar from "boring-avatars";
import Rewards from "@/public/images/rewards.svg";

const MobilePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const { user } = useFetchUserProfile();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem("originalUrl", pathname);
      return router.push("/auth/authenticate");
    }
  }, []);

  return (
    <>
      <div className="block lg:hidden space-y-12 md:px-16 p-5">
        <div className="space-y-3">
          {user?.pictureUrl ? (
            <Image
              src={user?.pictureUrl}
              alt="avatar icon"
              width={48}
              height={48}
              className="w-16 h-16 border-2 rounded-full"
            />
          ) : (
            <Avatar
              size={56}
              name={user?.fullName}
              variant="bauhaus"
              colors={["#008000", "#FFC12E", "#FF6617", "#FFC12E"]}
            />
          )}
          <p className="font-bold text-xl">{user?.fullName}</p>
        </div>

        <div className="flex justify-between">
          <Link
            href="/app/orders"
            className="flex flex-col items-center space-y-1"
          >
            <div className="bg-kaiglo_grey-disabled w-14 md:w-20 h-14 md:h-20 flex justify-center items-center rounded-xl">
              <Image
                src={OrderBox}
                alt="order icon"
                className="w-7 h-7 md:w-10 md:h-10"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm md:text-xl font-medium text-kaiglo_grey-base">
              Orders
            </p>
          </Link>
          <Link
            href="/app/wishlist"
            className="flex flex-col items-center space-y-1"
          >
            <div className="bg-kaiglo_grey-disabled w-14 md:w-20 h-14 md:h-20 flex justify-center items-center rounded-xl">
              <Image
                src={Wishlist}
                alt="wishlist icon"
                className="w-7 h-7 md:w-10 md:h-10"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm md:text-xl font-medium text-kaiglo_grey-base">
              Wishlist
            </p>
          </Link>
          <Link
            href="/app/rewards"
            className="flex flex-col items-center space-y-1"
          >
            <div className="bg-kaiglo_grey-disabled w-14 md:w-20 h-14 md:h-20 flex justify-center items-center rounded-xl">
              <Image
                src={Rewards}
                alt="rewards icon"
                className="w-7 h-7 md:w-10 md:h-10"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm md:text-xl font-medium text-kaiglo_grey-base">
              Rewards
            </p>
          </Link>
          <Link href="#" className="flex flex-col items-center space-y-1">
            <div className="bg-kaiglo_grey-disabled w-14 md:w-20 h-14 md:h-20 flex justify-center items-center rounded-xl">
              <Image
                src={Help}
                alt="help icon"
                className="w-7 h-7 md:w-10 md:h-10"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm md:text-xl font-medium text-kaiglo_grey-base">
              Help
            </p>
          </Link>
        </div>

        <div className="space-y-3 pb-20">
          <p className="text-kaiglo_grey-placeholder text-sm">
            ACCOUNT SETTINGS
          </p>
          <div className="rounded-2xl bg-kaiglo_grey-50 divide-y divide-y-kaiglo_grey-disabled">
            {mobileDashboardMenu.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className={cn(
                  "flex items-center justify-between md:py-6 md:px-5 py-4 px-3 md:text-xl",
                  item.title === "Log out" && "text-kaiglo_critical-base",
                )}
                onClick={
                  item.title === "Log out"
                    ? () => setOpenLogoutDialog(true)
                    : undefined
                }
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={item.icon}
                    alt="icon"
                    className="w-7 h-7 md:w-10 md:h-10"
                    width={24}
                    height={24}
                  />
                  <p className="font-medium">{item.title}</p>
                </div>

                <CaretRightIcon
                  className={cn(
                    item.title === "Log out" && "hidden",
                    "w-7 h-7",
                  )}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <LogoutDialog open={openLogoutDialog} setOpen={setOpenLogoutDialog} />
    </>
  );
};
export default MobilePage;
