import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import "../pages/Pins.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Form = (props) => {
  const [formObject, setFormObject] = useState({});
  const [pins, setPins] = useState([]);
  const [usedPins, setUsedPins] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("Welcome");
  const token = Cookies.get("authToken");
  const allPins = [5, 6, 12, 13, 16, 17, 19, 20, 21, 22, 23, 24, 25, 27];

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

  useEffect(() => {
    axios
      .get("/Flowers/usedpins/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const allpins = response.data.moisture_pins.concat(
          response.data.watering_pins
        );
        setUsedPins(allpins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [msg]);

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
        <h6 className="fw-bold mt-3">Choose pins</h6>
        <div className="radios">
          <img
            className="piImage"
            src="/PiPins.png"
            alt="Pi Pin Layout"
            id="piImage"
          />
          {allPins.map((pin, idx) =>
            usedPins.includes(`${pin}`) ? (
              <input
                key={idx}
                type="checkbox"
                name={pin}
                disabled
                onChange={handleArrayChange}
                className={`check${idx}`}
              />
            ) : (
              <input
                key={idx}
                type="checkbox"
                name={pin}
                onChange={handleArrayChange}
                className={`check${idx}`}
              />
            )
          )}
        </div>
      </form>
      <button className={styles.customBtn} onClick={handleSubmit}>
        {props.onLoad ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default Form;
