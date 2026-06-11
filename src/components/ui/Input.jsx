import React, { useId } from "react";

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className = "",
  containerClassName = "",
  leftIcon,
  rightIcon,
  type = "text",
  required = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = props.id || generatedId;

  return (
    <div className={`form-control w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="label pb-1">
          <span className="label-text flex items-center gap-1">
            {label}
            {required && <span className="text-error font-bold">*</span>}
          </span>
        </label>
      )}
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 text-base-content/50 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          className={`input w-full py-3 text-sm
            ${leftIcon ? "pl-11" : "pl-4"} 
            ${rightIcon ? "pr-11" : "pr-4"} 
            ${error ? "border-error ring-2 ring-error/10 bg-error/5" : "border-base-300 focus:border-primary"} 
            ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 text-base-content/50 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <label className="label pt-1.5">
          <span className="label-text-alt text-error text-xs font-semibold flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </span>
        </label>
      )}

      {!error && helperText && (
        <label className="label pt-1">
          <span className="label-text-alt text-base-content/60 text-xs">{helperText}</span>
        </label>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
