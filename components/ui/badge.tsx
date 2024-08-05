import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[96px] px-2 py-0.5 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-7 leading-[12px]",
  {
    variants: {
      variant: {
        primary: "bg-kaiglo_brand-base text-white",
        secondary: "bg-kaiglo_success-100 text-kaiglo_brand-base",
        critical: "bg-kaiglo_critical-100 text-kaiglo_critical-base",
        critical_solid: "bg-kaiglo_critical-base text-white",
        outline: "border border-kaiglo_grey bg-transparent",
        attention: "bg-kaiglo_attention-100 text-kaiglo_attention-base",
        attention_solid: "bg-kaiglo_attention-base text-white",
        purple: "bg-kaiglo_purple-100 text-kaiglo_purple-base",
        purple_solid: "bg-kaiglo_purple-base text-white",
        info: "bg-kaiglo_info-100 text-kaiglo_info-base",
        info_solid: "bg-kaiglo_info-base text-white",
        accent: "bg-kaiglo_accent-base text-black",
        ghost: "bg-kaiglo_grey-disabled text-black",
        link: "text-kaiglo_brand-base underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
