import React from 'react';

// TODO: Use CSLX for better class name handling
export const Button = ({
  children,
  className,
  type = 'button',
  ...otherProps
}) => {
  return (
    <button type={type} className={`bg-black ${className}`} {...otherProps}>
      {children}
    </button>
  );
};
