import { cn } from "~/lib/utils";
import { buttonVariants } from "./button";
import { forwardRef } from "react";
import { VariantProps } from "class-variance-authority";

export const OptionsButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
        "h-auto rounded-none border-b border-neutral-400 text-xl font-semibold shadow-none first:rounded-t-md",
      )}
      ref={ref}
      {...props}
    />
  );
});
OptionsButton.displayName = "OptionsButton";
