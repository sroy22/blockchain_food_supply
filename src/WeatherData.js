import React from 'react'
import { Card } from 'tabler-react'

import { DegreesToDirection, Month, Weekday, Day } from './helpers/utils'
import { Clock } from './Clock'
import './bootstrapCSS.css';

export const WeatherData = ({ data }) => {
  const { name, country, temp, description, temp_min, temp_max, icon, feels_like, speed, deg, humidity } = data;

  return (
  <div className='row'>
    <Card className="col-md-12 classWithPad">
      <div className='row'>
        <div className='col-md-4'>
          <Clock />
          <h5>{Weekday}, {Month} {Day}</h5>
        </div>
        <div className='col=md-4'>
        <div className='weather-main'>
          <img 
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
          className='weather-icon'/>
          <div>
            <h2>{name}, {country}</h2>
            <h3 className='description'>{description}</h3>
          </div>
        </div>
        <div className='temp-main'>
          <h5>Feels like {feels_like} °</h5>
          <h1 className='temperature'>{temp}°</h1>
          <div className='hi-lo'>
            <h5>H {temp_max}°</h5>
            <h5>L {temp_min}°</h5>
          </div>
        </div>
        </div>
    
      <div className='col-md-04 classWithPad'>
        <div className='weather-prop'>
          <h5>Wind: {DegreesToDirection(deg)} {speed} KPH</h5>
        </div>
        <div className='weather-prop'>
          <h5>Humidity: {humidity} %</h5>
        </div>
      </div>
      </div>
      </Card>
      </div>
  
  );
}