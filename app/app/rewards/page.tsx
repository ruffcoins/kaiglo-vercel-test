import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const RewardsComponent = dynamic(
  () => import("@/components/rewards/RewardsComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[calc(100vh-24rem)]">
        <Loader />
      </div>
    ),
  },
);

const Rewards = () => {
  return <RewardsComponent />;
};
export default Rewards;
