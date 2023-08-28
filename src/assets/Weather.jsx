import React, { useEffect, useState } from 'react'
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { WiDirectionUp, WiDirectionDown, WiThermometerExterior, WiMoonrise, WiMoonset, WiRain, WiHumidity, WiStrongWind } from "react-icons/wi";
import './weather.css'

const Weather = () => {
    const [weatherdata, setWeatherData] = useState(null);
    const [City, setCity] = useState("dehradun");
    const [error, setError] = useState(null);

    const fetchWeatherData = async () => {
        setError(null);
        await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8bebb3b8a6bd448d90a52501231908&q=${City}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data && data.location && data.current) {
                    setWeatherData(data);
                    console.log(data);
                } else {
                    console.error("unexpected api responce");
                }
            })
            .catch((error) => {
                console.error('fetching error', error);
                // setWeatherData(null);
                setError('An error occured please try again later')

            })
    }
    useEffect(() => {
        let timerOut = setTimeout(() => {
            fetchWeatherData();
        }, 1000);

        return () => {
            clearTimeout(timerOut)
        }
    }, [City])


    const handleInput = (e) => {
        const newValue = e.target.value;
        setCity(newValue);
    }
    const handleSearch = () => {
        fetchWeatherData(City);
    };
    // const {condition, temp_c, wind_kph , humidity ,uv ,last_updated} = weatherdata.current;
    // const {name , region , country , localtime} = weatherdata.location;

    const { location, current, forecast } = weatherdata || {};

    return (
        <div className='main-container'>
            <div className='input-sxn'>
                <input className='input-feild' type="text" placeholder='enter city name' defaultValue={City}
                    //  onClick={(e)=>{setCity(e.target.value)    
                    // }} 
                    onChange={handleInput}
                />
                <div className='input-icon-section'>
                    <button className='search-btn' onClick={handleSearch}> <FaSearch /></button>
                    <button className='search-btn' onClick={handleSearch}><FaMapMarkerAlt /></button>
                </div>
                {/* humidity rain wind section */}
                <div className='rain-wind-section'>
                    <p className=' hd1'> <WiHumidity /> Humidity: {current?.humidity}%</p>
                    <p className=' hd2'> <WiRain /> Rain: {current?.temp_c}%</p>
                    <p className=' hd3'> <WiStrongWind /> Wind: {current?.wind_kph}Km/h</p>

                </div>
            </div>
            <div className='second-sxn'>
                <div className='iconsection '>
                    <h2 className='hd'>{current?.condition?.text}</h2>
                    <img className='ig1' src={current?.condition?.icon} alt="conditionicon" />
                </div>
                <div className='loaction-sxn '>
                    <h2>{location?.name}({location?.region})</h2>
                    <p>{location?.country}</p>
                    <p>{current?.temp_c}°C <span>|</span> {current?.temp_f}°F </p>
                </div>
                <div className='time-sxn '>
                    <h2>Date | Time : {location?.localtime}</h2>
                </div>
            </div>
            <div className='details-sxn'>
                <div className='details-item'>
                    <button className='search-btn' > <BsFillSunriseFill /></button>
                    <p>SunRise: <span>{forecast?.forecastday[0]?.astro?.sunrise}</span></p>
                    <p className='space-tag'>|</p>
                </div>

                <div className='details-item'>
                    <button className='search-btn' > <BsFillSunsetFill /></button>
                    <p>SunSet: <span>{forecast?.forecastday[0]?.astro?.sunset}</span></p>
                    <p className='space-tag'>|</p>
                </div>

                <div className='details-item'>
                    <button className='search-btn' > <WiMoonrise /></button>
                    <p>MoonRise: <span>{forecast?.forecastday[0]?.astro?.moonrise}</span></p>
                    <p className='space-tag'>|</p>
                </div>

                <div className='details-item'>
                    <button className='search-btn' > <WiMoonset /></button>
                    <p>MoonSet: <span>{forecast?.forecastday[0]?.astro?.moonset}</span></p>
                    <p className='space-tag'>|</p>
                </div>

                <div className='details-item'>
                    <button className='search-btn' > <WiDirectionUp /></button>
                    <p>High: <span>{forecast?.forecastday[0]?.day?.maxtemp_c}°</span></p>
                    <p className='space-tag'>|</p>
                </div>

                <div className='details-item'>
                    <button className='search-btn' > <WiThermometerExterior /></button>
                    <p>Avg: <span>{forecast?.forecastday[0]?.day?.avgtemp_c}°</span></p>
                    <p className='space-tag'>|</p>

                </div>
                <div className='details-item'>
                    <button className='search-btn' > <WiDirectionDown /></button>
                    <p>Low: <span>{forecast?.forecastday[0]?.day?.mintemp_c}°</span></p>
                </div>



            </div>

            <div className='third-sxn'>
                {/* hourlyforcastsection */}
                <div className='hourly-forecast'>
                    {forecast?.forecastday[0]?.hour.map((hour) => (
                        <div className='hourly-item' key={hour.time}>
                            <p>{hour.time}</p>
                            <img src={hour.condition.icon} alt={hour.condition.text} />
                            <p>{hour.temp_c}°C</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Weather