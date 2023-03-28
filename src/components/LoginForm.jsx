import React from "react";
import styles from "./LoginForm.module.css";

const LoginForm = (props) => {
  return (
    <div className={styles.container}>
      <form className="py-4 px-4 w-75">
        {props.onError ? (
          <div className="alert alert-danger fw-bold fs-6" role="alert">
            {props.onError}
          </div>
        ) : (
          <h3 className="text-center mb-4">Welcome</h3>
        )}
        <label className="form-label" htmlFor="name">
          Username
        </label>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          id="name"
          onChange={props.onChange}
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={props.onChange}
          id="password"
        />
      </form>
      <button className={styles.customBtn} onClick={props.onSubmit}>
        {props.onLoad ? "Loging In..." : "Log In"}
      </button>
    </div>
  );
};

export default LoginForm;
