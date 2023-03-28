import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Form = (props) => {
  const [formObject, setFormObject] = useState({});
  const [pins, setPins] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("Welcome");
  const token = Cookies.get("authToken");

  const handleSubmit = () => {
    axios
      .post(
        "/Flowers",
        {
          info: formObject,
          pins: pins,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setMsg("Successfully submitted");
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  useEffect(() => {}, [msg]);

  const handleChange = (e) => {
    setFormObject((prevObj) => {
      return {
        ...prevObj,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleArrayChange = (event) => {
    if (pins.length >= 2) {
      setErr("You have to choose max two pins!");
    } else {
      setErr("");
    }

    let pin = event.target.name;
    let isThere = pins.indexOf(pin);
    if (isThere !== -1) {
      setPins((prevPins) => {
        return prevPins.filter((p) => p !== pin);
      });
    } else {
      setPins((prevPins) => {
        return [...prevPins, pin];
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeBtn} onClick={() => props.showForm(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <form className="py-4 px-4">
        {err ? (
          <div className="alert alert-danger fw-bold fs-6" role="alert">
            {err}
          </div>
        ) : (
          <h3 className="text-center mb-4 fw-bold">{msg}</h3>
        )}
        <label className="form-label fw-bold" htmlFor="name">
          Plant Name
        </label>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
        />
        <label htmlFor="preset" className="form-label fw-bold">
          Pre-set Moisture
        </label>
        <input
          type="number"
          className="form-control"
          name="set_moisture"
          onChange={handleChange}
          id="preset"
        />
        <div className={styles.radios}>
          <img
            className={styles.piImage}
            src="/PiPins.png"
            alt="Pi Pin Layout"
            id="piImage"
          />
          <input
            type="checkbox"
            name="23"
            onChange={handleArrayChange}
            className={styles.twentyThree}
          />
          <input
            type="checkbox"
            name="24"
            onChange={handleArrayChange}
            className={styles.twentyFour}
          />
          <input
            type="checkbox"
            name="25"
            onChange={handleArrayChange}
            className={styles.twentyFive}
          />
          <input
            type="checkbox"
            name="12"
            onChange={handleArrayChange}
            className={styles.twelve}
          />
          <input
            type="checkbox"
            name="16"
            onChange={handleArrayChange}
            className={styles.sixTeen}
          />
          <input
            type="checkbox"
            name="20"
            onChange={handleArrayChange}
            className={styles.twenty}
          />
          <input
            type="checkbox"
            name="21"
            onChange={handleArrayChange}
            className={styles.twentyOne}
          />
          <input
            type="checkbox"
            name="17"
            onChange={handleArrayChange}
            className={styles.sevenTeen}
          />
          <input
            type="checkbox"
            name="27"
            onChange={handleArrayChange}
            className={styles.twentySeven}
          />
          <input
            type="checkbox"
            name="22"
            onChange={handleArrayChange}
            className={styles.twentyTwo}
          />
          <input
            type="checkbox"
            name="5"
            onChange={handleArrayChange}
            className={styles.five}
          />
          <input
            type="checkbox"
            name="6"
            onChange={handleArrayChange}
            className={styles.six}
          />
          <input
            type="checkbox"
            name="13"
            onChange={handleArrayChange}
            className={styles.thirTeen}
          />
          <input
            type="checkbox"
            name="19"
            onChange={handleArrayChange}
            className={styles.nineTeen}
          />
        </div>
      </form>
      <button className={styles.customBtn} onClick={handleSubmit}>
        {props.onLoad ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default Form;
