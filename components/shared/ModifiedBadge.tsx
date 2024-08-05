import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/enums/orderStatus.enum";
import { ModifiedBadgeProps } from "@/interfaces/elements.interface";

const ModifiedBadge = ({ status }: ModifiedBadgeProps) => {
  const orderStatus = status?.toUpperCase();

  const sanitiszedStatus = status?.replace(/_/g, " ").toLocaleLowerCase();

  return (
    <Badge
      className="rounded w-fit py-1 px-1.5 capitalize"
      variant={`${
        orderStatus === OrderStatus.PENDING
          ? "attention"
          : orderStatus === OrderStatus.SHIPPED
            ? "info"
            : orderStatus === OrderStatus.DELIVERED
              ? "secondary"
              : orderStatus === OrderStatus.CANCELLED_ORDER
                ? "ghost"
                : orderStatus === OrderStatus.CONFIRMED
                  ? "primary"
                  : orderStatus === OrderStatus.PROCESSING
                    ? "accent"
                    : "purple"
      }`}
    >
      <span className="capitalize">{sanitiszedStatus}</span>
    </Badge>
  );
};
export default ModifiedBadge;
