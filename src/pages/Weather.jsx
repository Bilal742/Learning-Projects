import React, { useState } from "react";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        if (!city) return;
        try {
            const apiKey = "98cda38cf1e85820c60e9b8f9d71486c";

            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await res.json();
            if (data.cod === 200) {
                setWeather(data);
                setError("");
            } else {
                setWeather(null);
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to fetch weather.");
            setWeather(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") fetchWeather();
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6 text-white">
            <h1 className="text-4xl font-bold mb-10">Weather App</h1>

            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter city..."
                    className="p-3 rounded-lg outline-none text-white"
                />
                <button
                    onClick={fetchWeather}
                    className="bg-teal-500 px-5 py-3 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
                >
                    Get Weather
                </button>
            </div>

            {error && <p className="text-red-400 mb-6">{error}</p>}

            {weather && (
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
                    <p className="text-xl mb-2">
                        {weather.main.temp}°C, {weather.weather[0].main}
                    </p>
                    <p className="mb-2">Humidity: {weather.main.humidity}%</p>
                    <p className="mb-2">Wind: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}
