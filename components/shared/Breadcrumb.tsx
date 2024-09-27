import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string; // `href` is optional for the last item (active page)
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode; // Allows custom separator
  activeClassName?: string; // Allows custom styles for the active item
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/", // Default separator is `/`
  activeClassName = "font-medium", // Default active item styles
}) => {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-white min-h-12 py-3 px-5 overflow-x-auto"
    >
      <ol className="flex items-center space-x-2 flex-nowrap min-w-max">
        {items.map((item, index) => (
          <li key={index} className="flex items-center flex-shrink-0">
            {item.href ? (
              <Link href={item.href}>
                <span className="text-kaiglo_grey-placeholder text-sm truncate max-w-[150px]">
                  {item.label}
                </span>
              </Link>
            ) : (
              <span
                className={cn(
                  activeClassName,
                  "text-sm truncate max-w-[150px] lg:max-w-full",
                )}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-kaiglo_grey-placeholder ml-2 text-sm flex-shrink-0">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
