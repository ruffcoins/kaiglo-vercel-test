import OrderList from "@/components/order/OrderList";
import dynamic from "next/dynamic";

const BackButton = dynamic(() => import("@/components/shared/BackButton"), {
  ssr: false,
  loading: () => <div className="w-6 h-6 lg:hidden"></div>,
});

const Orders = () => {
  return (
    <div className="lg:space-y-4">
      <div className="border-b lg:border-none font-medium text-xl lg:text-start text-center lg:h-auto h-[60px] flex lg:justify-start justify-between items-center capitalize lg:drop-shadow-none drop-shadow px-4 lg:px-0">
        <BackButton />
        <span>My Orders</span>
        <div className="w-4 h-4 lg:hidden"></div>
      </div>

      <OrderList />
    </div>
  );
};
export default Orders;
