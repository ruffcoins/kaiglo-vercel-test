import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SetStateAction } from "react";
import OtpFormInput from "@/components/auth/OtpFormInput";

interface EnterOtpProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  email: string;
  phone: string;
}

const EnterOtp = ({ open, setOpen, email, phone }: EnterOtpProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[563px] p-8" data-testid="otp-dialog">
        <div className="px-8 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center">
              We've sent you a verification code
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 text-center">
            <div className="flex flex-col items-center px-2 py-4 space-y-2 rounded-lg bg-kaiglo_success-50">
              <p>
                Please check your registered email{" "}
                <span className="font-bold">{`“${email}”`}</span>{" "}
                <span>and</span> <span className="font-bold">Whatsapp</span>
              </p>
              <p>
                It is worth checking in your{" "}
                <span className="font-bold">inbox</span> and{" "}
                <span className="font-bold">spam</span> or{" "}
                <span className="font-bold">junk</span> mail section
              </p>
            </div>

            <p>for a four-digit code and enter it in the box below to login</p>
          </div>

          <div className="flex justify-center mx-auto">
            <OtpFormInput
              email={email}
              phone={phone}
              setShowOtpModal={setOpen}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnterOtp;
