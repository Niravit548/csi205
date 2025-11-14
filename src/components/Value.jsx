import { useEffect } from "react";

const Value = ({ name, initial, type, value, setValue }) => {
  useEffect(() => {
    if (initial !== undefined) {
      setValue(initial);
    }
  }, []);

  return (
    <div
      className="border border-black border-3 mx-auto rounded-3 p-2 bg-secondary-subtle mt-3"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">{name || "VALUE"}</h1>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <button className="btn btn-danger" onClick={() => setValue(value - 1)}>
          &minus;
        </button>
        <div className="fs-3 fw-bold">
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>
        <button className="btn btn-success" onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default Value;
