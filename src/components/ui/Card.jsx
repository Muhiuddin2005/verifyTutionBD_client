import React from "react";

const Card = React.forwardRef(({
  children,
  className = "",
  hoverable = false,
  glass = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        bg-base-100 border border-base-200 rounded-2xl overflow-hidden transition-all duration-300
        ${hoverable ? "hover:-translate-y-1 hover:shadow-xl hover:border-base-300" : "shadow-md"}
        ${glass ? "backdrop-blur-md bg-white/70 dark:bg-base-100/70 border-white/20" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-6 pb-4 flex flex-col gap-1.5 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", as: Tag = "h3", ...props }) => (
  <Tag className={`text-xl font-bold text-base-content tracking-tight ${className}`} {...props}>
    {children}
  </Tag>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-base-content/60 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

const CardBody = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 flex items-center border-t border-base-200/50 mt-auto ${className}`} {...props}>
    {children}
  </div>
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };
export default Card;
