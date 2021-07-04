import React, { Fragment } from "react";
import styles from "./styles.module.scss";

const Breadcrumb = ({ categories = [] }) => {
  return (
    <div className={`content ${styles.breadcrumb}`}>
      {categories.length ? (
        categories?.map((item, index) => (
          <Fragment key={index}>
            <span className={styles.text}>{item}</span>
            {!(index === categories.length - 1) && (
              <span className={styles.text}> &gt; </span>
            )}
          </Fragment>
        ))
      ) : (
        <span>Sin categoria</span>
      )}
    </div>
  );
};

export default Breadcrumb;
