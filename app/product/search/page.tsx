import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const SearchPage = dynamic(() => import("@/components/product/SearchPage"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[200px] w-screen">
      <Loader />
    </div>
  ),
});

const MobileSearchPage = dynamic(
  () => import("@/components/product/MobileSearchPage"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[200px] w-screen">
        <Loader />
      </div>
    ),
  },
);

export default async function ProductSearchResults() {
  return (
    <div className="lg:space-y-5">
      <SearchPage />
      <MobileSearchPage />
    </div>
  );
}
