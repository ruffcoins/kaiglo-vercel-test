import OrderList from "@/components/order/OrderList";

const Orders = () => {
  return (
    <div className="lg:space-y-4">
      <p className="font-medium text-xl lg:text-start text-center lg:h-auto h-[60px] flex lg:justify-start justify-center items-center capitalize lg:drop-shadow-none drop-shadow">
        My Orders
      </p>

      <OrderList />
    </div>
  );
};
export default Orders;
