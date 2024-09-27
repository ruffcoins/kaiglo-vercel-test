import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreIntroduction = dynamic(
  () => import("@/components/store/StoreIntroduction"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen border">
        <Loader />
      </div>
    ),
  },
);

const StoreProducts = dynamic(
  () => import("@/components/store/StoreProducts"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen border">
        <Loader />
      </div>
    ),
  },
);

const StoreSearch = dynamic(() => import("@/components/store/StoreSearch"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center w-96">
      <Loader />
    </div>
  ),
});

const Store = ({ params }: { params: { storeName: string } }) => {
  const { storeName } = params;

  return (
    <>
      <StoreIntroduction storeName={storeName} />
      <div className="space-y-4 mb-20">
        <div className="lg:mx-8 mx-4 rounded-lg space-y-4 bg-white p-4 justify-between items-center hidden lg:flex">
          <StoreSearch storeName={storeName} />
          <Select>
            <SelectTrigger className="w-fit border-0 border-b rounded-none">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="apple">Popularity</SelectItem>
                <SelectItem value="banana">Newest</SelectItem>
                <SelectItem value="blueberry">Price: Low to High</SelectItem>
                <SelectItem value="grapes">Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <StoreProducts storeName={storeName} />
      </div>
    </>
  );
};
export default Store;
