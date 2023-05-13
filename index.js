#!/usr/bin/env node

import { fetchWeather } from "./weather.js";
import { createSpinner } from 'nanospinner'
import inquirer from "inquirer";


const sleep = (ms=2000) => new Promise((r)=>setTimeout(r, ms))

const spinner = createSpinner('Fetching weather data...')

const main = async () => {
    try {
        console.clear()
        const cityName = process.argv[2]
        console.log(cityName)
        const units = await inquirer.prompt({
            name: 'units',
            type: 'list',
            message: 'Select a temperature unit',
            choices: ['metric', 'imperial']
        })
        spinner.start()
        const result = await fetchWeather(cityName, units.units)
        await sleep()
        spinner.stop('Done fetching')
        console.table(result)
    } catch (error) {
        spinner.stop('Done fetching')
        console.log('Something went wrong. Try again later')
    }
}

main()