import axios from 'axios'
import * as dotenv from 'dotenv'
import weatherTypes from './weatherTypes.js'

dotenv.config()

export const fetchWeather = async (city, units) => {
    const {data} = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
    const [{lat, lon}] = data
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.WEATHER_API_KEY}`)
    const summary = {
        Country: result.data.sys.country,
        City: result.data.name,
        Temperature: `${result.data.main.temp}${units==='metric'? 'ºC':'ºF'} ${weatherTypes['Temp']}`,
        Weather: `${result.data.weather[0].main} ${weatherTypes[result.data.weather[0].main]} `,
        Max: `${result.data.main.temp_max}${units==='metric'? 'ºC':'ºF'} ${weatherTypes['Max']}`,
        Min: `${result.data.main.temp_min}${units==='metric'? 'ºC':'ºF'} ${weatherTypes['Min']}`,
        FeelsLike: `${result.data.main.feels_like}${units==='metric'? 'ºC':'ºF'}`,
        Humidity: `${result.data.main.humidity} ${weatherTypes['Humidity']}`,
        WindSpeed: `${result.data.wind.speed} KM/h ${weatherTypes['Wind']}`
    }
    return summary
}