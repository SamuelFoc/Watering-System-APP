import React from "react";
import styles from "./Grid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Grid = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.addIcon} onClick={() => props.showForm(true)}>
        <FontAwesomeIcon icon={faAdd} />
      </div>
      <div className={styles.title}>
        <h3>My Plants</h3>
      </div>
      <div className={styles.grid}>
        {props.items?.map((item, key) => (
          <Link
            to={`/Flower/${item.id}`}
            style={{ color: "white", textDecoration: "none" }}
            key={key}
            className={styles.box}
          >
            <div className={styles.boxTitle}>
              <h5>{item.name}</h5>
            </div>
            <div className={styles.image}>
              <FontAwesomeIcon icon={faSeedling} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Grid;
