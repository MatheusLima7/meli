import React from "react";

const ProductName = ({ children, className = null }) => {
  return <h2 className={className}>{children}</h2>;
};

export default ProductName;
