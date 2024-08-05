import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Logo from "@/components/shared/Logo";
import Google from "@/public/images/google.svg";
import Image from "next/image";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { AuthDialogProps } from "@/interfaces/elements.interface";
import AuthForm from "@/components/forms/auth/AuthForm";

export function AuthDialog({
  openAuthModal,
  setOpenAuthModal,
  setShowOtpModal,
  setEmail,
  setPhone,
}: AuthDialogProps) {
  const [showReferraInput, setShowReferralInput] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleLoginForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <Dialog open={openAuthModal} onOpenChange={setOpenAuthModal}>
      <DialogContent
        className="w-[563px] transition-all duration-500"
        data-testid="auth-dialog"
      >
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <DialogHeader className="gap-y-4">
                  <DialogTitle className="flex justify-center">
                    <Logo className="w-28" />
                  </DialogTitle>
                  <DialogDescription className="flex space-x-4 justify-center mx-auto">
                    <ModifiedButton
                      type="button"
                      value="Sign up"
                      variant={`${showLogin ? "ghost" : "secondary"}`}
                      onClick={() => setShowLogin(false)}
                      className="font-medium px-8"
                      data-testid="sign-up-toggle"
                    />
                    <ModifiedButton
                      type="button"
                      value="Log in"
                      variant={`${showLogin ? "secondary" : "ghost"}`}
                      className="font-medium px-8"
                      onClick={() => setShowLogin(true)}
                      data-testid="log-in-toggle"
                    />
                  </DialogDescription>
                </DialogHeader>

                <AuthForm
                  showLogin={showLogin}
                  showReferraInput={showReferraInput}
                  setShowReferralInput={setShowReferralInput}
                  setShowOtpModal={setShowOtpModal}
                  setOpenAuthModal={setOpenAuthModal}
                  setEmail={setEmail}
                  setPhone={setPhone}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-kaiglo_grey-base text-center text-sm">
                {showLogin ? "OR SIGN IN WITH" : "OR SIGN UP WITH"}
              </p>

              <ModifiedButton
                type="button"
                variant="outline"
                value={
                  <>
                    <Image
                      src={Google}
                      alt="google icon"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span>Google</span>
                  </>
                }
                className="flex items-center justify-center space-x-2 text-kaiglo_grey-base text-base rounded-2xl mx-auto w-1/3 px-3 py-3.5 border-kaiglo_grey-disabled"
              />
            </div>
          </div>

          <p
            className="mt-8 text-kaiglo_grey-base text-center text-sm space-x-2"
            onClick={toggleLoginForm}
          >
            <span>
              {showLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <span className="text-kaiglo_brand-base font-bold cursor-pointer">
              {showLogin ? "Sign up" : "Log in"}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
