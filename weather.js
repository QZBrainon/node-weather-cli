import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const fetchWeather = async (city, units='standard') => {
    const {data} = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
    const [{lat, lon}] = data
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.WEATHER_API_KEY}`)
    console.table({
        Cidade: result.data.name,
        Temperatura: result.data.main.temp,
        Min: result.data.main.temp_min,
        Max: result.data.main.temp_max,
        SencaçãoTermica: result.data.main.feels_like,
        Ventos: `${result.data.wind.speed} KM/h`
    })

}

fetchWeather('riodejaneiro', 'metric')