import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const WishlistComponent = dynamic(
  () => import("@/components/wishlist/Wishlist"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[calc(100vh-24rem)]">
        <Loader />
      </div>
    ),
  },
);

const Wishlist = () => {
  return <WishlistComponent />;
};
export default Wishlist;
