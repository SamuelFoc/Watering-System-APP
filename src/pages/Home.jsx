import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import axios from "../api/axios";
import Grid from "../components/Grid";

const Home = () => {
  const [flowers, setFlowers] = useState([]);
  const [isShowed, setIsShowed] = useState(false);
  const token = Cookies.get("authToken");

  useEffect(() => {
    axios
      .get("/Flowers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFlowers(response.data.flowers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isShowed]);

  return (
    <>
      {isShowed && <Form showForm={setIsShowed} />}
      <Grid items={flowers} showForm={setIsShowed} />
    </>
  );
};

export default Home;
