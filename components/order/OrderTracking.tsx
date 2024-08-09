import Image from "next/image";
import OrderBox from "@/public/images/inactive-order-box.svg";
import { useOrderTimeline } from "@/hooks/queries/order";
import { useEffect, useState } from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const formatDate = (date: string) => {
  const utcMoment = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = utcMoment.format("DD-MMM-YYYY, hh:mmA");
  return formattedDate;
};

const OrderTracking = ({ orderNumber }: { orderNumber: string }) => {
  const { orderTimeline, fetchingOrderTimeline } =
    useOrderTimeline(orderNumber);

  const [numberOfSteps, setNumberOfSteps] = useState(0);

  useEffect(() => {
    setNumberOfSteps((orderTimeline?.timeLines.length as number) || 0);
  }, [orderTimeline]);

  if (fetchingOrderTimeline && !orderTimeline) {
    return <TimelineSkeletonLoader />;
  }

  return (
    <div className="relative my-6 space-y-1">
      {!fetchingOrderTimeline && (
        <>
          <div className="flex items-start space-x-4 pb-2">
            <Image src={OrderBox} alt="icon" width={24} height={24} />
            <div className="flex-shrink-0 flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center  border-2 bg-green-200 border-kaiglo_success-50`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium bg-kaiglo_info-100 rounded py-1 px-1.5 w-fit">
                Order Placed
              </p>
              <p className="text-sm text-kaiglo_grey-base uppercase">
                {formatDate(orderTimeline?.timeLines[0]?.time as string) ||
                  "Loading..."}
              </p>
            </div>
          </div>

          {orderTimeline?.timeLines.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <Image src={OrderBox} alt="icon" width={24} height={24} />
              <div className="flex-shrink-0 flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center  border-2 bg-green-200 border-kaiglo_success-50`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 text-green-600"
                  >
                    {/* {step.status === "completed" && ( */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                    {/* )} */}
                  </svg>
                </div>
                {index < numberOfSteps - 1 && (
                  <div className="h-10 border w-0.5 border-kaiglo_grey-disabled mx-auto my-0.5"></div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium bg-kaiglo_info-100 rounded py-1 px-1.5 w-fit capitalize">
                  {step.description.toLowerCase()}
                </p>
                <p className="text-sm text-kaiglo_grey-base uppercase">
                  {formatDate(step.time)}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderTracking;

const TimelineSkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex items-start space-x-4 animate-pulse">
          <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 bg-gray-200 border-gray-300">
            <Skeleton circle={true} height={24} width={24} />
          </div>
          {index < 4 - 1 && (
            <div className="h-10 border w-0.5 border-gray-200 mx-auto my-0.5"></div>
          )}
          <div className="space-y-2">
            <p className="text-sm font-medium bg-gray-200 rounded py-1 px-1.5 w-32">
              <Skeleton width={100} />
            </p>
            <p className="text-sm text-gray-400 uppercase">
              <Skeleton width={80} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
