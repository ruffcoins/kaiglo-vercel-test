"use client";

import OtpFormInput from "@/components/auth/OtpFormInput";
import OtpTimer from "@/components/auth/OtpTimer";
import ModifiedButton from "@/components/shared/ModifiedButton";

const EnterOtpMobile = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { email, phone } = searchParams;

  return (
    <div className="flex items-center h-screen px-6 bg-white">
      <div className="w-full space-y-8">
        <div className="space-y-4">
          <p className="text-xl font-bold text-center">Email Verification</p>

          <div className="space-y-2 text-sm text-center">
            <p>
              Enter the four-digit code we sent to your mail{" "}
              <span className="font-bold">{`“${email}”`}</span> <span>and</span>{" "}
              <span className="font-bold">Whatsapp</span>
            </p>
            <p>
              It is worth checking in your{" "}
              <span className="font-bold">inbox</span> and{" "}
              <span className="font-bold">spam</span> or{" "}
              <span className="font-bold">junk</span> mail section
            </p>
          </div>

          <div className="flex justify-center py-4">
            <OtpFormInput
              email={email as string}
              phone={phone as string}
              setShowOtpModal={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOtpMobile;
