import React, { useEffect, useRef, useState } from "react";

export default function Animation() {
  const fieldWidth = 650;
  const fieldHeight = 400;
  const ballDiameter = 200;

  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;

  const [running, setRunning] = useState(false);
  const [lastSelected, setLastSelected] = useState("none");

  const xRef = useRef(0);
  const yRef = useRef(0);
  const vxRef = useRef(5);
  const vyRef = useRef(5);
  const goRightRef = useRef(true);
  const goDownRef = useRef(true);

  const ballRef = useRef(null);
  const runBtnRef = useRef(null);
  const noneBtnRef = useRef(null);
  const btnsRef = useRef([]);

  useEffect(() => {
    btnsRef.current = btnsRef.current.slice(0, 7);

    const interval = setInterval(() => {
      if (running) {
        calculate();
        render();
      }
    }, 15);

    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleRun();
      }

      switch (e.key) {
        case "0":
          noneClicked(noneBtnRef.current);
          break;
        case "1":
          ballClicked(findButtonByText("Basketball"));
          break;
        case "2":
          ballClicked(findButtonByText("Football"));
          break;
        case "3":
          ballClicked(findButtonByText("Voleyball"));
          break;
        case "4":
          ballClicked(findButtonByText("Human"));
          break;
        case "5":
          ballClicked(findButtonByText("Cartoon"));
          break;
        case "6":
          ballClicked(findButtonByText("LOGO"));
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", onKey);
    };
  }, [running]);

  function toggleRun() {
    setRunning((r) => !r);
    setTimeout(render, 0);
  }

  function findButtonByText(text) {
    const t = text.toLowerCase();
    const found = btnsRef.current.find((b) => b && b.innerText && b.innerText.toLowerCase() === t);
    return found || null;
  }

  function noneClicked(btn) {
    if (!btn) return;

    if (lastSelected !== "none") {
      if (btnsRef.current.find(Boolean)) {
        const lastBtn = btnsRef.current.find((b) => b && b.classList && b.classList.contains("btn-primary"));
        if (lastBtn) {
          lastBtn.classList.remove("btn-primary");
          lastBtn.classList.add("btn-outline-primary");
        }
      }

      btn.classList.remove("btn-outline-secondary");
      btn.classList.add("btn-secondary");
    }

    if (ballRef.current) {
      ballRef.current.style.backgroundImage = "";
      ballRef.current.style.backgroundColor = "lightgray";
    }

    setLastSelected("none");
  }

  function ballClicked(btn) {
    if (!btn) return;

    const curelected = (btn.innerHTML || btn.innerText).toLowerCase();

    if (lastSelected === "none") {
      if (noneBtnRef.current) {
        noneBtnRef.current.classList.remove("btn-secondary");
        noneBtnRef.current.classList.add("btn-outline-secondary");
      }
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-primary");
    } else if (lastSelected === curelected) {
      return;
    } else {
      const lastBtn = btnsRef.current.find((b) => b && b.classList && b.classList.contains("btn-primary"));
      if (lastBtn) {
        lastBtn.classList.remove("btn-primary");
        lastBtn.classList.add("btn-outline-primary");
      }
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-primary");
    }

    if (ballRef.current) {
      let imageUrl = "";
      if (curelected.includes("basketball")) imageUrl = "url('./images/basketball.jpg')";
      if (curelected.includes("football")) imageUrl = "url('./images/football.jpg')";
      if (curelected.includes("voleyball")) imageUrl = "url('./images/volleyball.jpg')";
      if (curelected.includes("human")) imageUrl = "url('./images/หน้าข้อยเอง.jpg')";
      if (curelected.includes("cartoon")) imageUrl = "url('./images/หน้ากบ.jpg')";
      if (curelected.includes("logo")) imageUrl = "url('./images/logoบรีส.png')";

      ballRef.current.style.backgroundImage = imageUrl;
      ballRef.current.style.backgroundSize = "cover";
      ballRef.current.style.backgroundPosition = "center";
      ballRef.current.style.backgroundColor = "transparent";
    }

    setLastSelected(curelected);
  }

  function calculate() {
    if (goRightRef.current) {
      xRef.current = xRef.current + vxRef.current;
      if (xRef.current >= maxX) goRightRef.current = false;
    } else {
      xRef.current = xRef.current - vxRef.current;
      if (xRef.current <= 0) goRightRef.current = true;
    }

    if (goDownRef.current) {
      yRef.current = yRef.current + vyRef.current;
      if (yRef.current >= maxY) goDownRef.current = false;
    } else {
      yRef.current = yRef.current - vyRef.current;
      if (yRef.current <= 0) goDownRef.current = true;
    }
  }

  function render() {
    if (ballRef.current) {
      ballRef.current.style.left = `${xRef.current}px`;
      ballRef.current.style.top = `${yRef.current}px`;
    }

    if (runBtnRef.current) {
      if (running) {
        runBtnRef.current.classList.remove("btn-success");
        runBtnRef.current.classList.add("btn-warning");
        runBtnRef.current.innerHTML = "<span class=\"bi bi-pause\"></span>&nbsp;PAUSE";
      } else {
        runBtnRef.current.classList.remove("btn-warning");
        runBtnRef.current.classList.add("btn-success");
        runBtnRef.current.innerHTML = "<span class=\"bi bi-play\"></span>&nbsp;RUN";
      }
    }
  }

  return (
    <div style={{ margin: "auto", width: "fit-content", border: "1px solid black", borderRadius: "1rem", padding: "1rem" }}>
      <div
        id="field"
        style={{
          margin: "auto",
          borderRadius: "1rem",
          border: "1px solid red",
          backgroundImage: "url(./images/cyberback-ground.jpg)",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          position: "relative",
        }}
      >
        <div
          id="ball"
          ref={ballRef}
          style={{
            borderRadius: "50%",
            backgroundColor: "lightgray",
            width: `${ballDiameter}px`,
            height: `${ballDiameter}px`,
            position: "absolute",
            left: 0,
            top: 0,
          }}
        ></div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
        <button
          id="run"
          ref={runBtnRef}
          onClick={toggleRun}
          style={{ backgroundColor: running ? "#ffc107" : "#198754", color: running ? "black" : "white", border: "none", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
        >
          {running ? (
            <>
              <span className="bi bi-pause" />&nbsp;PAUSE
            </>
          ) : (
            <>
              <span className="bi bi-play" />&nbsp;RUN
            </>
          )}
        </button>

        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          <button id="none" ref={noneBtnRef} onClick={() => noneClicked(noneBtnRef.current)} style={{ backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1rem" }}>
            NONE
          </button>

          {["Basketball", "Football", "Voleyball", "Human", "Cartoon", "LOGO"].map((label, i) => (
            <button
              key={label}
              ref={(el) => (btnsRef.current[i] = el)}
              onClick={() => ballClicked(btnsRef.current[i])}
              style={{ backgroundColor: "transparent", border: "1px solid #0d6efd", color: "#0d6efd", borderRadius: "0.5rem", padding: "0.5rem 1rem" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
