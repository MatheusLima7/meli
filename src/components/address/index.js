import React from "react";
import styles from "./styles.module.scss";

const Address = ({ children }) => {
  return <div className={styles.localization}>{children}</div>;
};

export default Address;
