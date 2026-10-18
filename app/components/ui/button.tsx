import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg" | "icon";
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", href, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a9a7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1411] disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-[#f0eee9] text-[#0f1411] hover:bg-[#8a9a7a] hover:text-[#f0eee9] hover:shadow-lg hover:shadow-black/20",
      outline:
        "border border-[#2a302a] bg-transparent hover:border-[#8a9a7a] hover:text-[#8a9a7a] text-[#f0eee9]",
      ghost: "hover:bg-[#1a1f1c] text-[#f0eee9]",
    };

    const sizes = {
      default: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10",
    };

    const classes = [baseClasses, variants[variant], sizes[size], className].filter(Boolean).join(" ");

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
