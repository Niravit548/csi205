import { useState } from "react";
import Value from "../components/Value";
import Adder from "../components/Adder";
import Timer from "../components/Timer";
import Temperatures from "../components/Temperatures";
import RadixCounter from "../components/RadixCounter"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Components = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        background: "linear-gradient(180deg, #b7e779, #ffb347, #ff5f6d)",
      }}
    >
      <div className="container text-center mt-4 p-4 bg-transparent rounded-4">
        <h1 className="fw-bold text-dark mb-4 text-uppercase">
          REACT COMPONENT
        </h1>

        <div className="d-flex flex-column align-items-center gap-4">
          {/* Counter */}
          <div
            className="border border-dark rounded-4 p-3 bg-white shadow-lg"
            style={{ width: "480px" }}
          >
            <Value name="COUNTER" value={counter} setValue={setCounter} />
          </div>

          {/* Adder */}
          <div
            className="border border-dark rounded-4 p-3 shadow-lg"
            style={{ width: "880px", backgroundColor: "#D9D9D9" }}
          >
            <Adder />
          </div>

          {/* Timer */}
          <div
            className="border border-dark rounded-4 p-3 shadow-lg bg-white"
            style={{ width: "650px" }}
          >
            <Timer />
          </div>

          {/* Radix Counter */}
          <div
            className="border border-dark rounded-4 p-3 shadow-lg bg-white"
            style={{ width: "500px" }}
          >
            <RadixCounter />
          </div>

          {/* Temperature */}
          <div
            className="border border-dark rounded-4 p-3 shadow-lg bg-white"
            style={{ width: "1500px" }}
          >
            <Temperatures />
          </div>
        </div>

        {/* <p className="text-center fw-bold mt-4 text-dark">
          67172354 บุรชัย สละสำราญ
        </p> */}
      </div>
    </div>
  );
};

export default Components;
