import React from "react";

const Button = React.forwardRef(({
  children,
  className = "",
  variant = "primary", // primary, secondary, outline, ghost, danger, success, warning
  size = "md", // sm, md, lg
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = "button",
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/20 border border-transparent",
    secondary: "bg-secondary text-white hover:bg-secondary/95 shadow-md shadow-secondary/20 border border-transparent",
    outline: "bg-transparent border border-base-300 text-base-content hover:bg-base-200/50 hover:border-base-400",
    ghost: "bg-transparent text-base-content hover:bg-base-200/60",
    danger: "bg-error text-white hover:bg-error/95 shadow-md shadow-error/20 border border-transparent",
    success: "bg-success text-white hover:bg-success/95 shadow-md shadow-success/20 border border-transparent",
    warning: "bg-warning text-white hover:bg-warning/95 shadow-md shadow-warning/20 border border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5"
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
