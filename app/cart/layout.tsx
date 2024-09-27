import CartLayout from "@/components/layouts/CartLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shopping Cart | Kaiglo Nigeria",
  description:
    "Review and manage items in your shopping cart on Kaiglo Nigeria.",
  robots: "noindex, nofollow",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CartLayout>{children}</CartLayout>;
};
export default layout;
