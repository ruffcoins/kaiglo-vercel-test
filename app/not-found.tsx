import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <HomepageLayout>
      <main className="grid min-50vh max-w-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 shadow">
        <div className="text-center">
          <p className="text-base font-semibold text-kaiglo_brand-base">
            Uh Oh!
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page Not Found!
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-kaiglo_brand-base px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-kaiglo_brand-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kaiglo_brand-base"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </HomepageLayout>
  );
};
export default NotFound;
