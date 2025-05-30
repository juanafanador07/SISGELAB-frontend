import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-neutral-200 px-2 py-0.5 text-sm w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden ",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-red-500 text-neutral-50 [a&]:hover:bg-neutral-900/90",
        sucess:
          "border-transparent bg-green-500 text-neutral-50 [a&]:hover:bg-neutral-900/90",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-900 [a&]:hover:bg-neutral-100/90 ",
        destructive:
          "border-transparent bg-red-500 text-white [a&]:hover:bg-red-500/90 focus-visible:ring-red-500/20 ",
        outline:
          "text-neutral-950 [a&]:hover:bg-neutral-100 [a&]:hover:text-neutral-900 ",
        red: "bg-red-200 text-red-800",
        green: "bg-green-200 text-green-800",
        neutral: "bg-neutral-200 text-neutral-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
