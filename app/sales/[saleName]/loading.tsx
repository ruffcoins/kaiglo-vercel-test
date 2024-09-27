import Loader from "@/components/shared/Loader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen border">
      <Loader />
    </div>
  );
}
