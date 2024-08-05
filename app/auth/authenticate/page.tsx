"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import Google from "@/public/images/google.svg";
import AuthForm from "@/components/forms/auth/AuthForm";

const Auth = () => {
  const [showReferraInput, setShowReferralInput] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const toggleLoginForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <div className="bg-white flex items-center h-screen px-6">
      <div className="space-y-6 w-full">
        <div className="space-y-6">
          <div className="space-y-6">
            <div>
              <div>
                <div className="flex justify-center py-4">
                  <Logo className="w-28" />
                </div>
                <div className="flex space-x-4 justify-center">
                  <Button
                    variant={`${showLogin ? "ghost" : "secondary"}`}
                    className="font-medium px-8"
                    onClick={toggleLoginForm}
                  >
                    Sign up
                  </Button>
                  <Button
                    variant={`${showLogin ? "secondary" : "ghost"}`}
                    className="font-medium px-8"
                    onClick={toggleLoginForm}
                  >
                    Log in
                  </Button>
                </div>
              </div>

              <AuthForm
                showLogin={showLogin}
                showReferraInput={showReferraInput}
                setShowReferralInput={setShowReferralInput}
                setShowOtpModal={undefined}
                setOpenAuthModal={undefined}
                setEmail={setEmail}
                setPhone={setPhone}
              />
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-medium text-kaiglo_grey-base text-center text-sm">
              {showLogin ? "OR SIGN IN WITH" : "OR SIGN UP WITH"}
            </p>

            <Button
              variant={"outline"}
              className="flex items-center justify-center space-x-2 text-kaiglo_grey-base text-base h-12 rounded-2xl mx-auto w-fit px-3 py-3.5 border-kaiglo_grey-disabled"
            >
              <Image src={Google} alt="google icon" className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <p
          className="mt-8 text-kaiglo_grey-base text-center text-sm space-x-2"
          onClick={toggleLoginForm}
        >
          <span>
            {showLogin ? "Don't have an account?" : "Already have an account?"}
          </span>

          <span className="text-kaiglo_brand-base font-bold cursor-pointer">
            {showLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};
export default Auth;
