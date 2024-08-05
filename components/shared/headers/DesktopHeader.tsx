import Image from "next/image";
import Phone from "@/public/images/phone.svg";
import Search from "@/public/images/search.svg";
import Menu from "@/public/images/menu.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import CartButton from "@/components/shared/CartButton";
import WishlistButton from "@/components/shared/WishlistButton";
import CallToOrderHoverCard from "@/components/shared/headers/CallToOrderCTA";
import CategoriesNavigation from "./CategoriesNavigation";
import AuthButton from "@/components/shared/headers/AuthButton";
import NotificationButton from "@/components/shared/NotificationButton";

const DesktopHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 hidden bg-white shadow lg:block lg:px-8 xl:px-14">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full py-5 space-x-12">
        <Logo />

        {/* Search */}
        <div className="relative flex items-center w-full">
          <Input
            className="h-12 px-6 text-sm rounded-full"
            placeholder="Search for products"
          />
          <Button
            variant="accent"
            className="absolute w-8 h-8 p-0 rounded-full right-2"
          >
            <Image src={Search} alt="search icon" className="w-4 h-4" />
          </Button>
        </div>

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
        <div className="flex xl:space-x-8 lg:space-x-2">
          <div className="flex items-center p-1 pr-4 space-x-3 rounded-full cursor-pointer bg-kaiglo_success-100">
            <div className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-kaiglo_brand-base">
              <Image src={Menu} alt="menu icon" className="" />
            </div>
            <span className="min-w-fit">All Categories</span>
          </div>

          <CategoriesNavigation />
        </div>
        {/* Larger Screens Call To Order CTA */}
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

        <CallToOrderHoverCard classNames="w-10 h-10" />
      </div>
    </header>
    // </div>
  );
};

export default DesktopHeader;
