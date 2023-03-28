import {
  faBackward,
  faSeedling,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./FlowerBox.module.css";

const FlowerBox = (props) => {
  return (
    <div className={styles.container}>
      <Link to={"/"} className={styles.backArrow}>
        <FontAwesomeIcon icon={faBackward} />
      </Link>
      <div className={styles.delete} onClick={props.onDelete}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
      <div className={styles.title}>
        <h1>{props.data.name}</h1>
      </div>
      <div className="display-3 my-4">
        <FontAwesomeIcon icon={faSeedling} />
      </div>
      <div className="fs-5 mb-3">
        <strong>Moisture:&emsp;</strong>
        <span>{props.data.actual_moisture || "No Data"}</span>
        <br />
        <strong>Pre-set Moisture:&emsp;</strong>
        <span>{props.data.set_moisture + " %" || "No Data"}</span>
      </div>
      <label className="form-label" htmlFor="watering">
        Watering Duration: {props.dur} [s]
      </label>
      <input
        className="form-range mb-2"
        id="watering"
        name="duration"
        type="range"
        onChange={(e) => props.onDur(e.target.value)}
        value={props.dur}
        min={0}
        max={10}
      />
      {props.load && (
        <div className="spinner-grow text-primary my-3" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className={styles.buttons}>
        <button className={styles.refBtn} onClick={props.onMoisture}>
          REFRESH
        </button>
        <button className={styles.watBtn} onClick={props.onWater}>
          WATER
        </button>
      </div>
    </div>
  );
};

export default FlowerBox;
