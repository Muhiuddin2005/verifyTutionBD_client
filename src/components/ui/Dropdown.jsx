import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = ({
  trigger,
  children,
  align = "right", // left, right
  className = "",
  menuClassName = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const alignments = {
    left: "left-0 origin-top-left",
    right: "right-0 origin-top-right"
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute mt-2 z-40 min-w-[12rem] bg-base-100 border border-base-200 
              rounded-xl shadow-xl py-1 focus:outline-none divide-y divide-base-200/50
              ${alignments[align]} ${menuClassName}
            `}
          >
            {/* Clones children to automatically close dropdown when any menu item is clicked */}
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClick: (e) => {
                    if (child.props.onClick) {
                      child.props.onClick(e);
                    }
                    setIsOpen(false);
                  }
                });
              }
              return child;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({ children, className = "", onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-2.5 text-sm text-left text-base-content/85 
        hover:bg-base-200/60 hover:text-base-content transition-colors duration-200 
        first:rounded-t-lg last:rounded-b-lg cursor-pointer ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

Dropdown.displayName = "Dropdown";
DropdownItem.displayName = "DropdownItem";

export { Dropdown, DropdownItem };
export default Dropdown;
