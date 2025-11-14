import { useState } from "react"
import Value from "./Value"

const Temperatures = () => {
    const [celsius, setCelsius] = useState(0)
    const [fahrenheit, setFahrenheit] = useState(32)
    const [kelvin, setKelvin] = useState(273.15)

    const handleCelsiusChange = (c) => {
        setCelsius(c)
        setFahrenheit(c * 9/5 + 32)
        setKelvin(c + 273.15)
    }

    const handleFahrenheitChange = (f) => {
        const c = (f - 32) * 5/9
        setCelsius(c)
        setFahrenheit(f)
        setKelvin(c + 273.15)
    }

    const handleKelvinChange = (k) => {
        const c = k - 273.15
        setCelsius(c)
        setFahrenheit(c * 9/5 + 32)
        setKelvin(k)
    }

    return (
        <div className="border border-black border-2 mx-auto mt-3 rounded-3 p-3 box" style={{width: 'fit-content'}}>
            <h1 className="text-center text-primary">TEMPERATURE</h1>
            <div className="d-flex justify-content-around align-items-center fs-2 mb-3">
                <div className="badge bg-primary">{celsius.toFixed(2)} °C</div>
                <div className="badge bg-primary">{fahrenheit.toFixed(2)} °F</div>
                <div className="badge bg-primary">{kelvin.toFixed(2)} K</div>
            </div>
            <div className="d-flex gap-2">
                <Value name="CELSIUS" value={celsius} setValue={handleCelsiusChange} />
                <Value name="FAHRENHEIT" value={fahrenheit} setValue={handleFahrenheitChange} />
                <Value name="KELVIN" value={kelvin} setValue={handleKelvinChange} />
            </div>
        </div>
    )
}

export default Temperatures
