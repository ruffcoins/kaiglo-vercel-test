"use client";

import Image from "next/image";
import AvatarIcon from "@/public/images/avatar.svg";
import { AuthDialog } from "@/components/auth/dialogs/AuthDialog";
import { useEffect, useState } from "react";
import EnterOtp from "@/components/auth/dialogs/EnterOtp";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/shared/Loader";
import UserDropdown from "@/components/UserDropdown";
import { cn } from "@/lib/utils";
import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useShowToast from "@/hooks/useShowToast";

const AuthButton = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const { isLoggedIn } = useAuth();
  const { user } = useFetchUserProfile();
  const isOnline = useOnlineStatus();
  const showToast = useShowToast();

  useEffect(() => {
    if (!isOnline) {
      const offlineIntervalAlert = setInterval(() => {
        if (!isOnline) {
          showToast({
            altText: "Online Status",
            title: "You are offline",
            description: "Please check your internet connection and try again.",
            variant: "destructive",
            actionExists: false,
          });
        }
      }, 10000);

      return () => clearInterval(offlineIntervalAlert);
    }
  }, [isOnline]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <Loader classNames="w-6 h-6" />;
  }

  return (
    <>
      {isLoggedIn && user ? (
        <UserDropdown />
      ) : (
        <div
          data-testid="auth-button"
          className={cn(
            "flex items-center h-12 p-3 space-x-2 rounded-full cursor-pointer bg-kaiglo_grey-100",
          )}
          onClick={() => setOpenAuthModal(true)}
        >
          <Image src={AvatarIcon} alt="avatar icon" />
          <span className="text-sm font-medium">Login / Register</span>
        </div>
      )}

      {openAuthModal && (
        <AuthDialog
          openAuthModal={openAuthModal}
          setOpenAuthModal={setOpenAuthModal}
          setShowOtpModal={setShowOtpModal}
          setEmail={setEmail}
          setPhone={setPhone}
        />
      )}

      {showOtpModal && (
        <EnterOtp
          open={showOtpModal}
          setOpen={setShowOtpModal}
          email={email}
          phone={phone}
        />
      )}
    </>
  );
};
export default AuthButton;
