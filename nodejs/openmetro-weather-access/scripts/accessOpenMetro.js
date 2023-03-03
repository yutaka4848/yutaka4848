
"use strict";

const { application } = require("express");

class WeatherApi {
    constructor(){
        this.coordinates = [
            { city: 'Aomori', latitude: 40.82, longitude: 140.73},
            { city: 'Chiba', latitude: 35.60, longitude: 140.12 },
            { city: 'Hiroshima', latitude: 34.40, longitude: 132.45},
            { city: 'Kamakura', latitude: 35.31, longitude: 139.55},
            { city: 'Kanazawa', latitude: 35.18, longitude: 136.91},
            { city: 'Kochi', latitude: 33.55, longitude: 133.53}, 
            { city: 'Kyoto', latitude: 35.02, longitude: 135.75},
            { city: 'Matsuyama', latitude: 33.84, longitude: 132.77},
            { city: 'Nagasaki', latitude: 32.75, longitude: 129.88}, 
            { city: 'Nagoya', latitude: 35.18, longitude: 136.91},
            { city: 'Naha', latitude: 26.22, longitude: 127.68}, 
            { city: 'Niigata', latitude: 37.89, longitude: 139.01},
            { city: 'Oita', latitude: 33.23, longitude: 131.60}, 
            { city: 'Osaka', latitude: 34.69, longitude: 135.50},
            { city: 'Sapporo', latitude: 43.07, longitude: 141.35},
            { city: 'Saga', latitude: 33.23, longitude: 130.30},
            { city: 'Sendai', latitude:38.27, longitude: 140.87},
            { city: 'Tokyo', latitude: 35.69, longitude: 139.69 },
            { city: 'Utsunomiya', latitude:35.18, longitude: 136.91},
            { city: 'Yamagata', latitude: 38.23, longitude: 140.37}
        ];

        // options that have any value is given by comma separeted.
        this.optDefaults = {
            hourly: [
                'temperature_2m', 'cloudcover', 'windspeed_10m', 'winddirection_10m', 'rain', 'snowfall', 
            ], 
            daily: [
                'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min', 
                'rain_sum', 'showers_sum', 'snowfall_sum', 'windspeed_10m_max', 'windspeed_10m_min'
            ],
            current_weather: true, 
            wind_speed_unit: 'ms'
        };

        this.cities = this.coordinates.map((obj) => obj.city, []);
        this.apiUrl = 'https://api.open-meteo.com/v1/forecast';
        this.timezone = 'Asia%2FTokyo';

    }

    get citiesList(){
        return this.cities;
    }
    get getOptions(){
        return Object.keys(this.optUser).length ? this.optUser : this.optDefaults;
    }
    get getDefaults() {
        return Object.assign(this.optDefaults);
    }
    setOption(key, opt){
        this.optUser[key] = opt;
    }

    setOptions(opts={}){
        this.optUser = Object.assign(opts);
    }

    makeApiUrl(){
        let requestUrl = this.apiUrl + '?';
        const coord = this.coordinates.filter((obj) => obj.city === this.getOptions.city)[0];

        requestUrl += `latitude=${coord.latitude}&longitude=${coord.longitude}`;
        for(const key of Object.keys(this.getOptions)){
            if(!['city'].some(val => key === val)){

                if(key === 'daily' || key === 'hourly'){
                    requestUrl += `&${key}=${this.getOptions[key].join(',')}`;
                    requestUrl += `&timezone=${this.timezone}`;
                } else {
                    requestUrl += `&${key}=${this.getOptions[key]}`;
                }
            }
        }

        return requestUrl;
    }

    async accessApi(url=this.makeApiUrl()){
        if(!url) throw new Error('Empty ApiUrl. Please check Url params.');
        let res = await fetch(url);
        if(res.statusText !== 'OK') throw new Error(await res.text());

        return Object.assign(await res.json())
    }
}

module.exports = {
    WeatherApi
};