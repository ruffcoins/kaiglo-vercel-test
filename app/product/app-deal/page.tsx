import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const Introduction = dynamic(
  () => import("@/components/appDeal/Introduction"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

const page = () => {
  return (
    <InnerPageLayout>
      <Introduction />
    </InnerPageLayout>
  );
};
export default page;
