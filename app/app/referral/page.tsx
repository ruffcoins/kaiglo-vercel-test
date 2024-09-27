import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const ReferralComponent = dynamic(
  () => import("@/components/referral/ReferralComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[calc(100vh-24rem)]">
        <Loader />
      </div>
    ),
  },
);

const Referral = () => {
  return <ReferralComponent />;
};

export default Referral;
