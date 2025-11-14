import { useState, useEffect } from "react";
import "./cal.css";

const Calculator = () => {
  const [screen, setScreen] = useState("0");
  const [state, setState] = useState("S0");
  const [firstOperand, setFirstOperand] = useState(0);
  const [lastOperand, setLastOperand] = useState(0);
  const [operatorNow, setOperatorNow] = useState("");

  
  useEffect(() => {
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");

    if (plusBtn && minusBtn) {
      plusBtn.classList.remove("cal-btn-orenge", "cal-btn-green");
      minusBtn.classList.remove("cal-btn-orenge", "cal-btn-green");

      if (operatorNow === "+") {
        plusBtn.classList.add("cal-btn-orenge");
        minusBtn.classList.add("cal-btn-green");
      } else if (operatorNow === "-") {
        minusBtn.classList.add("cal-btn-orenge");
        plusBtn.classList.add("cal-btn-green");
      } else {
        plusBtn.classList.add("cal-btn-green");
        minusBtn.classList.add("cal-btn-green");
      }
    }
  }, [operatorNow]);

  const numClicked = (number) => {
    if (state === "S0") {
      setScreen(number.toString());
      setState("S1");
    } else if (state === "S1") {
      setScreen((prev) => (prev.length < 9 ? prev + number.toString() : prev));
    } else if (state === "S2") {
      setScreen(number.toString());
      setState("S1");
    }
  };

  const operatorClicked = (operator) => {
    setFirstOperand(parseInt(screen));
    setLastOperand(parseInt(screen));
    setOperatorNow(operator);
    setState("S2");
  };

  const equalClicked = () => {
    if (operatorNow === "") return;

    let result = firstOperand;
    let newLast = lastOperand;

    if (state === "S1") {
      newLast = parseInt(screen);
      setLastOperand(newLast);
    }

    if (operatorNow === "+") result = firstOperand + newLast;
    else if (operatorNow === "-") result = firstOperand - newLast;

    setFirstOperand(result);
    setScreen(result.toString());
    setState("S2");
  };

  const clearClicked = () => {
    setScreen("0");
    setState("S0");
    setFirstOperand(0);
    setLastOperand(0);
    setOperatorNow("");
  };

  // รองรับการพิมพ์จากแป้นพิมพ์
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key >= "0" && event.key <= "9") {
        numClicked(Number(event.key));
      } else if (event.key === "+") {
        operatorClicked("+");
      } else if (event.key === "-") {
        operatorClicked("-");
      } else if (event.key === "=" || event.key === "Enter") {
        equalClicked();
      } else if (event.key === "Escape") {
        clearClicked();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="cal-container">
      <div id="screen" className="cal-Display">{screen}</div>

      <div>
        <button className="cal-btn cal-btn-green" disabled>MC</button>
        <button className="cal-btn cal-btn-green" disabled>MR</button>
        <button className="cal-btn cal-btn-green" disabled>M+</button>
        <button className="cal-btn cal-btn-green" disabled>M&minus;</button>
        <button className="cal-btn cal-btn-red" onClick={clearClicked}>CE</button>
      </div>

      <div>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(7)}>7</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(8)}>8</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(9)}>9</button>
        <button className="cal-btn cal-btn-green" disabled>&divide;</button>
        <button className="cal-btn cal-btn-green" disabled>&Sqrt;</button>
      </div>

      <div>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(4)}>4</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(5)}>5</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(6)}>6</button>
        <button className="cal-btn cal-btn-green" disabled>&times;</button>
        <button className="cal-btn cal-btn-green" disabled>%</button>
      </div>

      <div>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(1)}>1</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(2)}>2</button>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(3)}>3</button>
        <button id="minus" className="cal-btn cal-btn-green" onClick={() => operatorClicked("-")}>&minus;</button>
        <button className="cal-btn cal-btn-green" disabled>1/x</button>
      </div>

      <div>
        <button className="cal-btn cal-btn-blue" onClick={() => numClicked(0)}>0</button>
        <button className="cal-btn cal-btn-blue" disabled>.</button>
        <button className="cal-btn cal-btn-blue" disabled>+/<sub>&minus;</sub></button>
        <button id="plus" className="cal-btn cal-btn-green" onClick={() => operatorClicked("+")}>+</button>
        <button className="cal-btn cal-btn-green" onClick={equalClicked}>=</button>
      </div>

      <div className="student">67172354 บุราชัย สละสำราญ</div>
    </div>
  );
};

export default Calculator;
