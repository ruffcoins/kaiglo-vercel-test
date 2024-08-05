import { Input } from "@/components/ui/input";
import CartButton from "@/components/shared/CartButton";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/public/images/search.svg";
import Menu from "@/public/images/menu.svg";
import { landingCategoriesMenu } from "@/constants/menu";
import CallToOrderHoverCard from "@/components/shared/headers/CallToOrderCTA";
import NotificationButton from "@/components/shared/NotificationButton";

const MobileHeader = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex flex-col p-4 space-y-4 bg-white lg:hidden shadow">
      <div className="flex items-center justify-between ">
        <Logo />

        <div className="flex space-x-4">
          <CallToOrderHoverCard classNames="" />
          <NotificationButton notificationCountClassNames="top-0 -right-1" />
          <CartButton />
        </div>
      </div>

      <div className="relative flex items-center w-full">
        <Input
          className="h-12 pl-12 text-sm rounded-full"
          placeholder="Search for products, brands"
        />
        <Button
          variant="ghost"
          className="absolute w-8 h-8 p-0 rounded-full left-2"
        >
          <Image src={Search} alt="search icon" className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex w-full space-x-4 overflow-x-auto">
        <div className="flex items-center px-3 py-1.5 space-x-3 rounded-full cursor-pointer bg-kaiglo_grey-disabled min-w-fit">
          <div className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-kaiglo_brand-base">
            <Image src={Menu} alt="menu icon" className="w-2.5 h-2.5" />
          </div>
          <span className="text-sm">All Categories</span>
        </div>

        <div className="flex items-center space-x-1 list-none">
          {landingCategoriesMenu.map((item) => (
            <li
              key={item.id}
              className="px-4 py-1 break-words rounded-full cursor-pointer w-fit hover:bg-kaiglo_grey-100 min-w-fit capitalize text-sm"
            >
              {item.name}
            </li>
          ))}
        </div>
      </div>
    </header>
  );
};
export default MobileHeader;
