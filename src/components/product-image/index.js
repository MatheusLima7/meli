import React from "react";

const ProductImage = ({ source, title }) => {
  return <img src={source} alt={title} />;
};

export default ProductImage;
