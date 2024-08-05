import Image from "next/image";
import OrderBox from "@/public/images/inactive-order-box.svg";

const OrderTracking = ({ orderNumber }: { orderNumber: string }) => {
  // const { orderTimeline } = useOrderTimeline(orderNumber);

  const steps = [
    {
      label: "Order Placed",
      date: "08-MAY-2024, 08:00AM",
      status: "completed",
    },
    {
      label: "Awaiting Confirmation",
      date: "08-MAY-2024, 10:00AM",
      status: "completed",
    },
    { label: "Shipped", date: "10-MAY-2024, 1:00PM", status: "completed" },
    {
      label: "Confirm Delivery",
      date: "12-MAY-2024, 05:00PM",
      status: "pending",
    },
    { label: "Delivered", date: "15-MAY-2024, 02:00PM", status: "pending" },
  ];

  return (
    <div className="relative my-6 space-y-1">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start space-x-4">
          <Image src={OrderBox} alt="icon" width={24} height={24} />
          <div className="flex-shrink-0 flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center  border-2 ${
                step.status === "completed"
                  ? "bg-green-200 border-kaiglo_success-50"
                  : "bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 text-green-600"
              >
                {step.status === "completed" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                )}
              </svg>
            </div>
            {index < steps.length - 1 && (
              <div className="h-10 border w-0.5 border-kaiglo_grey-disabled mx-auto my-0.5"></div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium bg-kaiglo_info-100 rounded py-1 px-1.5 w-fit">
              {step.label}
            </p>
            <p className="text-sm text-kaiglo_grey-base uppercase">
              {step.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;
