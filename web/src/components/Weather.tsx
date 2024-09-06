import React from 'react';

export interface Weather {
    city: string;
    country: string;
    description: string;
    temp: number;
}


interface WeatherInfoProperties {
    weather: Weather
}

function WeatherInfo({ weather }: WeatherInfoProperties): React.ReactElement {
    const KELVIN_TO_CELSIUS = 273.15;

    return (
        <div className="bg-yellow-10 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Weather in {weather.city}, {weather.country}</h2>
            <p className="text-lg">{weather.description}</p>
            <p className="text-3xl font-bold">{(weather.temp - KELVIN_TO_CELSIUS).toFixed(1)}°C</p>
        </div>
    );
}

export default WeatherInfo;

