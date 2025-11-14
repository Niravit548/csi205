import { useState, useEffect } from "react"

const Timer = () => {
  const [second, setSecond] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer
    if (isRunning) {
      timer = setInterval(() => {
        setSecond((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const convertToString = (sec) => {
    const MINUTE_SECOND = 60
    const minute = Math.floor(sec / MINUTE_SECOND)
    const second = sec % MINUTE_SECOND
    return `${minute}m ${second}s`
  }

  const handleReset = () => {
    setSecond(0)
    setIsRunning(false)
  }

  return (
    <div className="border border-dark rounded p-3 text-center w-50 mx-auto mt-4 shadow box">
      <h1 className="mb-3">TIMER</h1>

      <input
        value={convertToString(second)}
        readOnly
        className="form-control text-center mb-3"
      />

      <div className="d-flex justify-content-center gap-3">
        <button onClick={handleReset} className="btn btn-danger">
          <i className="bi bi-x-circle-fill"></i>&nbsp;Reset
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn ${isRunning ? "btn-warning" : "btn-success"}`}
        >
          <i className={`bi ${isRunning ? "bi-pause" : "bi-play"}`}></i>&nbsp;
          {isRunning ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  )
}

export default Timer
