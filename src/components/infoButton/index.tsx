import React, { FunctionComponent, Fragment, useState } from "react";
import styles from "./index.module.css";

const InfoButton: FunctionComponent = () => {
  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  return (
    <div
      className={styles.container}
      onClick={() => setShouldShowInfo(!shouldShowInfo)}
    >
      <div className={styles.infoButton}>i</div>
      {shouldShowInfo && (
        <Fragment>
          <div
            className={styles.mouseTarget}
            onMouseLeave={() => setShouldShowInfo(false)}
          ></div>
          <div className={styles.infoBox}>
            Raw exercise data provided by{" "}
            <a href="https://github.com/everkinetic/data">Everkinetic</a> under
            a{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">
              CC BY-SA 4.0
            </a>{" "}
            license.
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default InfoButton;
