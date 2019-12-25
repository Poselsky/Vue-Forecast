<template>
  <div class="main_weather_card" v-bind:style="{ backgroundColor: backgroundColor,color: colors.colors.mostDarkestGrey }">
      <div class="background_wrapper" v-bind:style="{backgroundColor: backgroundColor}">
      </div>
      
      <div class="main_weather_card_content_wrapper">
        <div class="left">
            <p class="city">{{weatherData.name}}</p>
            <now-weather-part v-bind:weatherDataNow="chosenData"/>
            <div class="forecast_times">
                <p>Sunrise: {{getTime(forecastData.city.sunrise)}}</p>
                <p>Sunset: {{getTime(forecastData.city.sunset)}}</p>
            </div>
        </div>
        <div class="right">
            <div class="additional_desc">
                <p class="datetime">{{getTime(weatherData.dt)}}</p>
                <p class="temperature">{{weatherData.main.temp}} °C</p>
            </div>

            <div class="forecast_absolute_wrap">
                <div class="forecast_wrap">
                    <forecast-weather-part v-bind:forecastData="data" v-for="data in forecastData.list" v-bind:key="data.dt"/>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import NowWeatherPart from "../NowWeatherPart/NowWeatherPart";
import ForecastWeatherPart from '../ForecastWeather/ForecastWeatherPart';
import Colors from '../../colorsWeather'
import Velocity from 'velocity-animate';

export default {
    props:["weatherData","forecastData"],
    data:function(){
        return{
            backgroundColor: "rgb(255, 200, 150)",
            colors: Colors,
            weatherDataMinified:{
                main: {},
                weatherDesc : undefined,
                wind: undefined
            },
        }
    },
    components:{
        "now-weather-part": NowWeatherPart,
        "forecast-weather-part": ForecastWeatherPart
    },
    methods:{
        indexList: function(){
 
        },
        getTime(unixTime){
            /*
            const date = new Date();
            const hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
            const minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
            return `${hours}:${minutes}`;
            */

            const dateObj = new Date(unixTime * 1000); 
            const utcString = dateObj.toUTCString(); 

            return utcString.slice(-12, -7);
        },
        async animateForecast(){
            Velocity(document.querySelector('.forecast_wrap'), { top: 0 }, { duration: 500 }, {});
        }
    },
    computed:{
        chosenData:function(){
            let weatherDataMinified = {};
            weatherDataMinified.main = this.weatherData.main;
            weatherDataMinified.weatherDesc = this.weatherData.weather[0].description;
            weatherDataMinified.wind = this.weatherData.wind;
            weatherDataMinified.icon = this.weatherData.weather[0].icon;
            return weatherDataMinified;
        },
    },
    mounted(){
        this.animateForecast();
    }
}
</script>

<style lang="scss" scoped>
    .main_weather_card{
        width: 100%;
        height: 100%;

        .main_weather_card_content_wrapper{
            display: grid;
            grid-template-columns: 2fr 3fr;
            justify-items: center;
            padding: 20px;

            .left{
                grid-column: 1/2;
                text-align: center;
                font-size: 2rem;
                padding-right: 20px;
                >.city{
                    font-weight: 700;
                    text-transform: uppercase;
                }
                >.forecast_times{
                    text-align: start;
                    font-size: 1.4rem;
                }
            }

            .right{
                grid-column: 2/3;
                display: grid;
                padding-bottom: 20px;
                row-gap: 20px;
                grid-template-rows: auto 1fr;
                width: 100%;
                height: 100%;
                                
                .additional_desc{
                    grid-row: 1/2;
                    font-size: 2rem;
                    text-align: end;
                }
                .forecast_absolute_wrap{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    .forecast_wrap{
                        top: -500px;
                        left:10%;
                        position: absolute;
                        align-self: flex-end;
                        display: grid;
                        row-gap: 20px;
                    }
                }
            }
        }

    }
</style>