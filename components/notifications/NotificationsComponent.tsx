"use client";

import Image from "next/image";
import { useNotifications } from "@/hooks/queries/notification/getNotifications";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const NotificationsComponent = () => {
  const router = useRouter();
  const { notifications, fetchingNotifications } = useNotifications();

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        <div className="lg:relative fixed top-0 bg-white w-full flex lg:space-x-2 items-center lg:justify-start justify-between lg:h-auto h-[60px] px-5 lg:drop-shadow-none drop-shadow lg:px-0 z-10">
          <ChevronLeftIcon
            className="w-6 h-6 lg:hidden cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-medium lg:text-start text-center">
            Notifications
          </h1>
          <div className="w-6 h-6"></div> {/* Placeholder to center the h1 */}
        </div>

        {fetchingNotifications ? (
          <>
            <div className="animate-pulse bg-gray-200 h-20 mb-3"></div>
            <div className="animate-pulse bg-gray-200 h-20 mb-3"></div>
            <div className="animate-pulse bg-gray-200 h-20 mb-3"></div>
          </>
        ) : notifications && notifications.length === 0 ? (
          <div className="lg:h-[calc(100vh-30rem)] h-[calc(100vh-10rem)] col-span-full flex flex-col items-center justify-center space-y-4">
            <div className="gap-2.5 flex flex-col items-center">
              <p className="font-medium">You have no notifications.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications &&
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="border flex justify-between items-center p-2 rounded-lg"
                >
                  <div className="gap-x-2 flex justify-start items-center">
                    <Image
                      src={notification.image}
                      alt={"notification image"}
                      width={100}
                      height={100}
                      className="w-14 h-14"
                    />
                    <div className="">
                      <p className="font-bold text-sm">{notification.header}</p>
                      <p className="text-sm">{notification.description}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-[10px]">
                        {new Date(notification.createdDate).toLocaleTimeString(
                          "en-US",
                          { hour: "numeric", minute: "numeric", hour12: true },
                        )}
                      </p>
                      <p className="w-2 h-2 rounded-full bg-kaiglo_brand-base"></p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
export default NotificationsComponent;
