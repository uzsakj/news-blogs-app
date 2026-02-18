import React, { useState, useEffect } from 'react'
import './Weather.css'
import axios from 'axios'

const Weather = () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setIsLoading(true);
            const defaultLocation = 'New York';
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${defaultLocation}&aqi=no`;
            const response = await axios.get(url);
            setIsLoading(false);
            const defaultData = await response.data;
            setData(defaultData);
        }
        fetchDefaultWeather();
    }, []);

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    }

    const search = async () => {
        if (location.trim() !== '') {
            setIsLoading(true);
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
            try {
                const response = await axios.get(url);
                setIsLoading(false);
                const searchData = await response.data;
                setData(searchData);
                setLocation('');
            } catch (error) {
                setData({ notFound: true, error: error.message });
                setIsLoading(false);
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }
    return (
        <div className='weather'>
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">{data.location?.name || 'New York'}</div>
                </div>
                <div className="search-location">
                    <input
                        type="text"
                        placeholder='Enter Location...'
                        value={location}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            {data.notFound ? (
                <div className="not-found">Location not found</div>
            ) : (
                <div className="weather-data">
                    <img src={data.current?.condition?.icon || null} alt="weather icon" />
                    <div className="weather-type">{data.current?.condition?.text || ''}</div>
                    <div className="temp">{data.current?.temp_c || ''}°</div>
                </div>
            )}

        </div>
    )
}

export default Weather