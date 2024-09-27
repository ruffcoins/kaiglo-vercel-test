import Image from "next/image";
import NotificationBell from "@/public/images/notification-bell.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NotificationButtonProps {
  notificationCount?: number;
  classNames?: string;
  notificationCountClassNames?: string;
}

const NotificationButton = ({
  notificationCount = 0,
  classNames,
  notificationCountClassNames,
}: NotificationButtonProps) => {
  return (
    <Link
      href="/app/notifications"
      className={cn(
        "relative flex justify-center items-center lg:rounded-full cursor-pointer lg:bg-kaiglo_grey-100",
        classNames,
      )}
    >
      <Image
        src={NotificationBell}
        alt="notification bell icon"
        className="w-6 h-6"
        width={24}
        height={24}
      />
      <span
        className={cn(
          "flex justify-center items-center absolute font-medium rounded-full bg-kaiglo_critical-500 w-5 h-5 text-[10px] text-white",
          notificationCountClassNames,
        )}
      >
        {notificationCount}
      </span>
    </Link>
  );
};

export default NotificationButton;
