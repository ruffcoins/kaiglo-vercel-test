import CartButton from "@/components/shared/CartButton";
import Logo from "@/components/shared/Logo";
import CallToOrderHoverCard from "@/components/shared/headers/CallToOrderCTA";
import NotificationButton from "@/components/shared/NotificationButton";
import dynamic from "next/dynamic";
import Loader from "../Loader";

const GlobalSearch = dynamic(
  () => import("@/components/shared/headers/GlobalSearch"),
  {
    ssr: false,
    loading: () => (
      <div className="h-12 rounded-full w-full bg-slate-300 animate-pulse"></div>
    ),
  },
);

const MobileHeader = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex flex-col p-4 space-y-6 bg-white lg:hidden shadow">
      <div className="flex items-center justify-between ">
        <Logo />

        <div className="flex space-x-4">
          <CallToOrderHoverCard classNames="" />
          <NotificationButton notificationCountClassNames="top-0 -right-1" />
          <CartButton />
        </div>
      </div>

      {/* Search */}
      <GlobalSearch />
    </header>
  );
};
export default MobileHeader;
