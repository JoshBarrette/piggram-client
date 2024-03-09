import { forwardRef } from "react";
import { Button } from "./button";
import { cn } from "~/lib/utils";
import { Link } from "@tanstack/react-router";
import useUser from "~/hooks/useUser";

export const NavButton = forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & { pProps?: string }
>(({ className, children, variant = "ghost", pProps, ...props }, ref) => {
  return (
    <Button
      variant={variant}
      className={cn("h-12 w-full", className)}
      ref={ref}
      {...props}
    >
      <p
        className={cn(
          "my-auto flex space-x-2 text-left text-xl font-semibold xl:w-full",
          pProps,
        )}
      >
        {children}
      </p>
    </Button>
  );
});
NavButton.displayName = "NavButton";

export const NavIconButton = forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & { pProps?: string }
>(({ className, children, variant = "ghost", pProps, ...props }, ref) => {
  return (
    <Button
      variant={variant}
      className={cn("size-10", className)}
      ref={ref}
      {...props}
    >
      <p className={pProps}>{children}</p>
    </Button>
  );
});
NavIconButton.displayName = "NavIconButton";

export const NavButtonLink = forwardRef<
  React.ElementRef<typeof NavButton>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    to: string;
    linkClassName?: string | undefined;
  }
>(({ className, children, to, linkClassName, ...props }, ref) => {
  const { isSignedIn } = useUser();

  return (
    <Link
      to={to}
      className={cn("w-full", linkClassName)}
      disabled={to.includes("upload") && !isSignedIn}
    >
      <NavButton
        className={className}
        ref={ref}
        {...props}
        disabled={to.includes("upload") && !isSignedIn}
      >
        {children}
      </NavButton>
    </Link>
  );
});
NavButtonLink.displayName = "NavButtonLink";

export const NavIconButtonLink = forwardRef<
  React.ElementRef<typeof NavIconButton>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    to: string;
    linkClassName?: string | undefined;
  }
>(({ className, children, to, linkClassName, ...props }, ref) => {
  const { isSignedIn } = useUser();

  return (
    <Link
      to={to}
      className={linkClassName}
      disabled={to.includes("upload") && !isSignedIn}
    >
      <NavIconButton
        className={className}
        ref={ref}
        {...props}
        disabled={to.includes("upload") && !isSignedIn}
      >
        {children}
      </NavIconButton>
    </Link>
  );
});
NavIconButtonLink.displayName = "NavIconButtonLink";
