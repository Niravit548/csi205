import { useState } from "react";

const RadixCounter = () => {
  const [value, setValue] = useState(0);

  
  const plusClicked = () => {
    if (value >= 4095) {
      setValue(0);
    } else {
      setValue((prev) => prev + 1);
    }
  };

  
  const minusClicked = () => {
    if (value <= 0) {
      setValue(4095);
    } else {
      setValue((prev) => prev - 1);
    }
  };

  
  const resetClicked = () => {
    setValue(0);
  };

  return (
    <div
      className="border border-dark rounded-4 p-3 bg-white shadow-lg mx-auto"
      style={{ width: "400px" }}
    >
     
      <h4 className="fw-bold text-center text-dark mb-3">
        RADIX COUNTER
      </h4>

      
      <div className="d-flex justify-content-between text-center">
        <div>
          <div className="fw-bold">[HEX]</div>
          <div className="font-monospace text-secondary">
            {value.toString(16).toUpperCase().padStart(3, "0")}
          </div>
        </div>
        <div>
          <div className="fw-bold">[DEC]</div>
          <div className="font-monospace text-primary fw-bold">
            {value.toString().padStart(4, "0")}
          </div>
        </div>
        <div>
          <div className="fw-bold">[OCT]</div>
          <div className="font-monospace text-success">
            {value.toString(8).padStart(4, "0")}
          </div>
        </div>
        <div>
          <div className="fw-bold">[BIN]</div>
          <div
            className="font-monospace text-danger"
            style={{ fontSize: "14px" }}
          >
            {value.toString(2).padStart(12, "0")}
          </div>
        </div>
      </div>

      {/* ปุ่มควบคุม */}
      <div className="mt-4 d-flex justify-content-around">
        <button
          className="btn btn-danger px-4"
          onClick={minusClicked}
        >
          &minus;
        </button>
        <button
          className="btn btn-secondary px-4"
          onClick={resetClicked}
        >
          RESET
        </button>
        <button
          className="btn btn-success px-4"
          onClick={plusClicked}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default RadixCounter;
