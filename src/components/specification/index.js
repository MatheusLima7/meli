import React from "react";
import styles from "./styles.module.scss";

const Specification = ({ condition, sold_quantity = "" }) => {
    return (
        <div className={styles.specification}>
            <span className={styles.condition}>
                {condition == "new" ? "nuevo" : "gastado"}
            </span>{" "}
            -{" "}
            <span className={styles.soldQuantity}>
                {sold_quantity} vendidos
            </span>
        </div>
    );
};

export default Specification;
