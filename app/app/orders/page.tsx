import OrderEmptyState from "@/components/emptyStates/OrderEmptyState";
import OrderSummaryCard from "@/components/order/OrderSummaryCard";
import { orders } from "@/constants/data";

const Orders = () => {
  return (
    <div className="lg:space-y-4">
      <p className="font-medium text-xl lg:text-start text-center lg:h-auto h-[60px] flex lg:justify-start justify-center items-center capitalize lg:drop-shadow-none drop-shadow">
        My Orders
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 p-4 lg:p-0">
        {orders.length === 0 ? (
          <OrderEmptyState />
        ) : (
          orders.map((order) => (
            <>
              <OrderSummaryCard
                key={order.id}
                id={order.id}
                image={order.image}
                title={order.title}
                orderNumber={order.orderNumber}
                price={order.orderNumber}
                status={order.status}
                link={order.link}
              />
              <hr className="border lg:hidden" />
            </>
          ))
        )}
      </div>
    </div>
  );
};
export default Orders;
