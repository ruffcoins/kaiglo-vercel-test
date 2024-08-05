import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const Wishlist = () => {
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

  return <WishlistComponent />;
};
export default Wishlist;
