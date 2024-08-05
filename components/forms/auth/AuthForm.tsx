import ControlledModifiedInput from "@/components/ControlledElements/ControlledModifiedInput";
import ModifiedButton from "@/components/shared/ModifiedButton";
import { CommonAuthFormDTO } from "@/interfaces/dtos/auth.dto.interface";
import {
  signInDefaultValues,
  signUpDefaultValues,
} from "@/lib/validations/defaults";
import { signInResolver, signUpResolver } from "@/lib/validations/resolvers";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Resolver, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AuthFormProps } from "@/interfaces/elements.interface";
import { useSignUp } from "@/hooks/mutation/auth/signup";
import { useLogin } from "@/hooks/mutation/auth/login";

const AuthForm = ({
  showLogin,
  showReferraInput,
  setShowReferralInput,
  setShowOtpModal,
  setOpenAuthModal,
  setEmail,
  setPhone,
}: AuthFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommonAuthFormDTO>({
    defaultValues: showLogin ? signInDefaultValues : signUpDefaultValues,
    resolver: showLogin
      ? (signInResolver as Resolver<CommonAuthFormDTO>)
      : (signUpResolver as Resolver<CommonAuthFormDTO>),
  });

  const toggleReferralInput = () => {
    setShowReferralInput((prev) => !prev);
  };

  const { signup, signingUp } = useSignUp({
    setShowOtpModal,
    setOpenAuthModal,
  });

  const { login, loggingIn } = useLogin({
    setShowOtpModal,
    setOpenAuthModal,
  });

  const onSubmit = (values: CommonAuthFormDTO) => {
    setEmail(values.email);
    setPhone(values.phone);

    if (showLogin) {
      login(values);
    } else {
      signup(values);
    }
  };

  return (
    <div className="pt-6 transition-all duration-300 ease-in-out">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 space-y-4">
          {!showLogin && (
            <ControlledModifiedInput
              name="firstName"
              control={control}
              placeholder="First Name"
              type="text"
              error={errors.firstName}
              isRequired={!showLogin}
              classNames="col-span-4"
              rules={{ required: !showLogin }}
              data-testid="firstName"
            />
          )}

          <ControlledModifiedInput
            name="email"
            control={control}
            rules={{ required: true }}
            placeholder="Email"
            type="email"
            error={errors.email}
            isRequired={true}
            data-testid="email"
          />

          <div className="relative">
            <span className="absolute bg-kaiglo_grey-disabled text-base w-[72px] rounded-l-lg ml-[1px] h-[46px] flex justify-center items-center border-0 mt-[1px]">
              +234
            </span>
            <ControlledModifiedInput
              name="phone"
              control={control}
              rules={{ required: true }}
              placeholder="Phone Number"
              type="tel"
              error={errors.phone}
              isRequired={true}
              classNames="pl-20"
              data-testid="phone"
            />
          </div>

          {!showLogin && (
            <div className=" gap-4">
              <div className="flex items-center justify-between col-span-4">
                <p className="">Have a referral code ?</p>
                <CaretDownIcon
                  className={`${showReferraInput ? "rotate-180" : ""} w-6 h-6 cursor-pointer text-black`}
                  onClick={toggleReferralInput}
                />
              </div>
              {!showLogin && showReferraInput ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ControlledModifiedInput
                    name="referralCode"
                    control={control}
                    placeholder="Enter Referral Code"
                    type="text"
                    error={errors.referralCode}
                    classNames="mt-4"
                  />
                </motion.div>
              ) : null}
            </div>
          )}
        </div>

        <ModifiedButton
          type="submit"
          value={
            signingUp || loggingIn
              ? "Please wait..."
              : showLogin
                ? "Log in"
                : "Sign up"
          }
          className="mt-12 w-full rounded-full font-medium"
          disabled={signingUp || loggingIn}
          data-testid="auth-submit-button"
        />
      </form>
    </div>
  );
};
export default AuthForm;
