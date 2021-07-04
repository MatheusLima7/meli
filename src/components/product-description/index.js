import React from "react";
import styles from "./styles.module.scss";

const ProductDescription = ({ children }) => {
    return <div className={styles.description}>{children}</div>;
};

export default ProductDescription;
