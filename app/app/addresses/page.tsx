import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const AddressComponent = dynamic(
  () => import("@/components/address/AddressComponent"),
  {
    loading: () => (
      <div className="flex justify-center items-center h-[calc(100vh-24rem)]">
        <Loader />
      </div>
    ),
    ssr: false,
  },
);

const Addresses = () => {
  return <AddressComponent />;
};
export default Addresses;
