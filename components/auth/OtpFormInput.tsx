"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import OtpTimer from "@/components/auth/OtpTimer";
import { useVerifyOtp } from "@/hooks/mutation/auth/verifyOtp";

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const OtpFormInput = ({
  email,
  phone,
  setShowOtpModal,
}: {
  email: string;
  phone: string;
  setShowOtpModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { verifyOtp, verifyingOtp } = useVerifyOtp({ setShowOtpModal });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyOtp({ otp: data.otp, email, phone });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-6"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />

        <OtpTimer email={email} phone={phone} />

        <Button
          type="submit"
          variant="primary"
          className="w-full h-12 font-bold rounded-full"
          disabled={verifyingOtp}
        >
          {verifyingOtp ? "Please wait..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};

export default OtpFormInput;
