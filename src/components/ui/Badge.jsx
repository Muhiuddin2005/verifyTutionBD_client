

const Badge = ({
  children,
  className = "",
  variant = "primary", // primary, secondary, success, warning, error, info, outline, ghost
  size = "md", // sm, md, lg
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full border transition-colors duration-250 select-none";
  
  const variants = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary",
    success: "bg-success/10 border-success/20 text-success-content dark:text-success",
    warning: "bg-warning/10 border-warning/20 text-warning-content dark:text-warning",
    error: "bg-error/10 border-error/20 text-error-content dark:text-error",
    info: "bg-info/10 border-info/20 text-info",
    outline: "bg-transparent border-base-300 text-base-content/75",
    ghost: "bg-base-200/55 border-transparent text-base-content/70"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm"
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export default Badge;
