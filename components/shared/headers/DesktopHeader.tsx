import Image from "next/image";
import Phone from "@/public/images/phone.svg";
import Menu from "@/public/images/menu.svg";
import Logo from "@/components/shared/Logo";
import CartButton from "@/components/shared/CartButton";
import WishlistButton from "@/components/shared/WishlistButton";
import CallToOrderHoverCard from "@/components/shared/headers/CallToOrderCTA";
// import CategoriesNavigation from "./CategoriesNavigation";
import AuthButton from "@/components/shared/headers/AuthButton";
import NotificationButton from "@/components/shared/NotificationButton";
import dynamic from "next/dynamic";
import Link from "next/link";
// import MegaMenu from "./MegaMenu";

const GlobalSearch = dynamic(
  () => import("@/components/shared/headers/GlobalSearch"),
  {
    ssr: false,
  },
);

const MegaMenu = dynamic(() => import("./MegaMenu"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center space-x-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="rounded-full w-20 h-8 bg-slate-200 animate-pulse"
        ></div>
      ))}
    </div>
  ),
});

const DesktopHeader = ({ showCallToOrder }: { showCallToOrder?: boolean }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 hidden bg-white shadow lg:block lg:px-8">
      {/* Top Header */}
      <div className="relative flex items-center justify-between w-full py-5 space-x-12">
        <Logo />

        {/* Search */}
        <GlobalSearch />

        <div className="flex space-x-4 item-center min-w-fit">
          {/* Notification Bell */}
          <NotificationButton
            notificationCount={0}
            classNames="w-12 h-12"
            notificationCountClassNames="-top-1 -right-1"
          />

          {/* Wishlist */}
          <WishlistButton />

          {/* Login / Register */}
          <div className="flex items-center">
            <AuthButton />
          </div>

          <CartButton />
        </div>
      </div>

      {/* Categories and Phone CTA */}
      <div className="relative flex justify-between py-2.5 text-sm">
        <div className="flex xl:space-x-4 lg:space-x-2">
          <Link
            href="/category"
            className="flex space-x-3 items-center bg-kaiglo_success-100 rounded-full p-1 pr-4"
          >
            <span className="bg-kaiglo_brand-base rounded-full min-w-8 min-h-8 flex items-center justify-center">
              <Image src={Menu} alt="menu icon" className="min-w-4 h-min-h-4" />
            </span>
            <span className="text-kaiglo_grey-700">All Categories</span>
          </Link>

          <MegaMenu />
        </div>

        {/* Larger Screens Call To Order CTA */}
        {showCallToOrder && (
          <div className="items-center hidden space-x-2 xl:flex">
            <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-kaiglo_grey-100">
              <Image src={Phone} alt="phone icon" className="" />
            </div>

            <div className="flex-col">
              <p className="text-sm font-bold">Call to place order</p>
              <p className="text-sm text-kaiglo_attention-base">
                +234 915 449 1603
              </p>
            </div>
          </div>
        )}

        <CallToOrderHoverCard classNames="w-10 h-10 border" />
      </div>
    </header>
    // </div>
  );
};

export default DesktopHeader;
