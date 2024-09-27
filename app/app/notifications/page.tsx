import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";

const NotificationsComponent = dynamic(
  () => import("@/components/notifications/NotificationsComponent"),
  {
    loading: () => (
      <div className="flex justify-center items-center h-[calc(100vh-24rem)]">
        <Loader />
      </div>
    ),
    ssr: false,
  },
);

const Notifications = () => {
  return <NotificationsComponent />;
};

export default Notifications;
