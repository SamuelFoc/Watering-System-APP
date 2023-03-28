import React from "react";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.container}>
      <h1>We are sorry</h1>
      <p>Try to reaload requested page again, please.</p>
    </div>
  );
};

export default Error;
