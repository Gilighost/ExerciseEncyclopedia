import React, { FunctionComponent } from "react";
import styles from "./index.module.css";

const LoadingSpinner: FunctionComponent = () => (
  <div className={styles.spinner}>
    <div className={styles.doubleBounce1}></div>
    <div className={styles.doubleBounce1}></div>
  </div>
);

export default LoadingSpinner;
