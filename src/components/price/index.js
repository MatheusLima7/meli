import React from "react";
import styles from "./styles.module.scss";
let euroEU = Intl.NumberFormat("es-AR");

const Price = ({ currency = "$", amount = 0, size = "24" }) => {
  return (
    <p className={`size${size} ${styles.price}`}>
      {String(currency + " " + euroEU.format(amount))}
    </p>
  );
};

export default Price;
