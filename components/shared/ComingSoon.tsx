import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

const ComingSoon = () => {
  return (
    <div className="grid place-items-center h-[600px] bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Logo className="mx-auto" />

      <div className="text-center">
        <p className="text-base font-semibold text-kaiglo_brand-base">
          Maintain steeze!
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Component under construction!
        </h1>
      </div>
    </div>
  );
};
export default ComingSoon;
