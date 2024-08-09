"use client";

// import ReferArt from "@/public/images/refer-art.png";
import Image from "next/image";
// import Person from "@/public/images/person.svg";
import { useNotifications } from "@/hooks/queries/notification/getNotifications";

// const notificationData = [
//   {
//     createdDate: '2024-08-05T09:00:00Z',
//     data: {
//       offerTitle: '35% OFF Ladies Esprit Pm Arya',
//       productName: 'Ladies Watch',
//       productCode: 'Es108212003',
//     },
//     description: '35% OFF Ladies Esprit Pm Arya Ladies Watch - Es108212003',
//     header: 'Offer',
//     image: ReferArt, // Update with actual image path or URL
//     isRead: false,
//     notificationId: '123456',
//     type: 'PRODUCT_DISCOUNT_NOTIFICATION',
//     userId: 'user123',
//   },
//   {
//     createdDate: '2024-08-05T09:00:00Z',
//     data: {
//       offerTitle: '35% OFF Ladies Esprit Pm Arya',
//       productName: 'Ladies Watch',
//       productCode: 'Es108212003',
//     },
//     description: '35% OFF Ladies Esprit Pm Arya Ladies Watch - Es108212003',
//     header: 'Offer',
//     image: ReferArt, // Update with actual image path or URL
//     isRead: false,
//     notificationId: '123456',
//     type: 'PRODUCT_DISCOUNT_NOTIFICATION',
//     userId: 'user123',
//   },
//   {
//     createdDate: '2024-08-05T09:00:00Z',
//     data: {
//       offerTitle: '35% OFF Ladies Esprit Pm Arya',
//       productName: 'Ladies Watch',
//       productCode: 'Es108212003',
//     },
//     description: '35% OFF Ladies Esprit Pm Arya Ladies Watch - Es108212003',
//     header: 'Offer',
//     image: ReferArt, // Update with actual image path or URL
//     isRead: false,
//     notificationId: '123456',
//     type: 'PRODUCT_DISCOUNT_NOTIFICATION',
//     userId: 'user123',
//   }
// ]

const Notifications = () => {
  const { notifications, fetchingNotifications } = useNotifications();

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        <div className="flex justify-between">
          <p className="text-xl font-medium capitalize">Notifications</p>
        </div>

        {fetchingNotifications ? (
          <>
            <div className="animate-pulse bg-gray-200 h-20 mb-3"></div>
            <div className="animate-pulse bg-gray-200 h-20 mb-3"></div>
            <div className="animate-pulse bg-gray-200 h-20 mb-3"></div>
          </>
        ) : notifications && notifications.length === 0 ? (
          <div className="h-[calc(100vh-30rem)] col-span-full flex flex-col items-center justify-center space-y-4">
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
export default Notifications;
