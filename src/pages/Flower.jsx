import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import FlowerBox from "../components/FlowerBox";

const Flower = () => {
  const [flower, setFlower] = useState({});
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [duration, setDuration] = useState(0);
  const { id } = useParams();
  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/Flowers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFlower(response.data);
      })
      .catch((error) => {
        setMsg(error.message);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`/Flowers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setMsg(error.message);
      });
  };

  const handleWater = () => {
    setLoad(true);
    axios
      .get(`/Flowers/watering/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          duration: duration,
        },
      })
      .then((response) => {
        setLoad(false);
      })
      .catch((error) => {
        setMsg(error.message);
        setLoad(false);
      });
  };

  const handleMoisture = () => {
    setLoad(true);
    axios
      .get(`/Flowers/moisture/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
      })
      .catch((error) => {
        setMsg(error.message);
        setLoad(false);
      });
  };

  return (
    <div>
      {msg && (
        <div class="alert alert-danger mb-5" role="alert">
          {msg}
        </div>
      )}
      <FlowerBox
        data={flower}
        onWater={handleWater}
        onMoisture={handleMoisture}
        onDelete={handleDelete}
        load={load}
        dur={duration}
        onDur={setDuration}
      />
    </div>
  );
};

export default Flower;
