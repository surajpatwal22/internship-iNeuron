import React, { useEffect, useState } from 'react'
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './weather.css'

const Weather = () => {
    const [weatherdata, setWeatherData] = useState(null);
    const [City,setCity] = useState("dehradun");
    const [error , setError] = useState(null);
    // const Apikey = "8bebb3b8a6bd448d90a52501231908";

    const fetchWeatherData = async () =>{
        setError(null);
        await fetch(`https://api.weatherapi.com/v1/current.json?key=8bebb3b8a6bd448d90a52501231908&q=${City}`)
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
            .catch((error)=>{
                console.error('fetching error',error);
                // setWeatherData(null);
                setError('An error occured please try again later')

            })
    }

    useEffect(() => {
        let timerOut = setTimeout(() => {
          fetchWeatherData();
         }, 1000);   
  
         return ()=>{
            clearTimeout(timerOut)}
      }, [City])


    const handleInput = (e)=>{
        const newValue = e.target.value;
         setCity(newValue);
    }
    const handleSearch = ()=>{
        fetchWeatherData(City);
    };
    // const {condition, temp_c, wind_kph , humidity ,uv ,last_updated} = weatherdata.current;
    // const {name , region , country , localtime} = weatherdata.location;

    const {location ,current} = weatherdata || {};

    return (
        <div className='main-container'>
            <div className='input-sxn'>
                <input className='input-feild' type="text" placeholder='enter city name' defaultValue={City} 
                //  onClick={(e)=>{setCity(e.target.value)    
                // }} 
                onChange={handleInput}
                />
                <button className='search-btn' onClick={handleSearch}><FaSearch></FaSearch></button>
            </div>
           <div className='second-sxn'>
           <div className='iconsection display-box '>
                <img className='ig1' src={current?.condition?.icon} alt="conditionicon" />
                <h2 className='hd'>{current?.condition?.text}</h2>
            </div>
            <div className='loaction-sxn display-box'>
                <h2>Place : {location?.name}({location?.region})</h2>
                <h2>Country : {location?.country} </h2>
            </div>
            <div className='time-sxn display-box'>
                <h2>Date&Time: <br /> <br />{location?.localtime}</h2>
            </div>
           </div>
           <div className='third-sxn'>
            <h2 className='display-box hd1'>Humidity:<hr />  {current?.humidity}</h2>
            <h2 className='display-box hd2'>Temp: <hr /> {current?.temp_c}degree celcius</h2>
            <h2 className='display-box hd3'>Wind-Speed: <hr /> {current?.wind_kph}kph</h2>
                
           </div>
            
        </div>
    )
}

export default Weather