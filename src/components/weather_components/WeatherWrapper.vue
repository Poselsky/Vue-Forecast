<template>
    <div class="weather_wrapper" v-if="weather.loaded">
      <div class="main_card" v-if="forecast.loaded">
        <main-weather-card v-bind:weatherData="weather.data.firstEl" v-bind:forecastData="forecast.data"/>
      </div>
      <div class="weather_cards" v-bind:style="{backgroundColor: colors.colors.midDarkestGrey, gap}" v-on:wheel="scrollX">
        <weather-card v-bind:weatherData="data" v-for="data in weather.data.list" v-bind:key="data.name" v-on:show-id="getWeather" />
      </div>
    </div>
</template>

<script>

import WeatherCard from './WeatherCard';
import MainWeatherCard from './MainWeatherCard';
import axios from 'axios';
import colorsWeather from '../colorsWeather';

export default {
  components:{
    "weather-card": WeatherCard,
    "main-weather-card": MainWeatherCard
  },
  data:function(){
    return {
      weather:{
        loaded: false,
        data: {
          firstEl: {},
          list:[]
        }
      },
      forecast:{
        loaded:false,
        data:{}
      },
      apiKey:process.env.VUE_APP_API_KEY,
      colors: colorsWeather,
      gap: "2px",
    }
  },
  methods: {
    weatherFetcher: function() {
      
      axios.get(`https://api.openweathermap.org/data/2.5/find?lat=50.68&lon=13.86&cnt=10&appid=${this.apiKey}&mode=json&units=metric`)
      .then(response => {
          this.weather.data.firstEl = response.data.list[0];
          this.weather.data.list = response.data.list.slice(1,response.data.list.length);
          this.weather.loaded = true;
      }).catch(er => {
          alert(er);
      });
    },
    forecastFetcher: function(id){
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${this.apiKey}&mode=json&units=metric&cnt=4`)
      .then((response)=> {
          this.forecast.data = response.data;
          this.forecast.loaded = true;
      }).catch(er =>{
          alert(er);
      });

    },
    getWeather:function(id){
      const weatherList = this.weather.data.list;
      let first = this.weather.data.firstEl;
      let index;
      let neededEl;
      for(let i = 0; i < weatherList.length; i++){
        if(weatherList[i].id == id){
          neededEl = weatherList[i];
          index = i;
          break;
        }
      }
      weatherList[index] = first;
      this.weather.data.firstEl = neededEl;
      this.forecast.loaded = false;
      this.forecastFetcher(id);
    },
    scrollX(event){
      const parent = document.querySelector('.weather_cards');
      const percent = parent.clientWidth / 10;
      if(event.deltaY > 0){
        document.querySelector('.weather_cards').scrollLeft+=percent;
      } else if(event.deltaY < 0) {
        document.querySelector('.weather_cards').scrollLeft -=percent;
      }

      //Preventing default, if scroll is not on the end

      const scrollLeftOffset = event.currentTarget.scrollLeft;
      if(scrollLeftOffset != 0 && (event.currentTarget.clientWidth + scrollLeftOffset) != event.currentTarget.scrollWidth){
        event.preventDefault();
      }
    }
  },
  computed:{
    weatherDataExceptFirst:{
      get(){
        let dataList = [];
        for(let i = 1; i< this.weather.data.list.length; i++){
          dataList.push(this.weather.data.list[i]);
        }
        return dataList;
      },
    }   
  },
  weatherDataFirstElement:{
    get(){
      let dataList = this.weather.data.list;
      return {
        loaded: this.weather.loaded,
        data: dataList[0],
      }
    },
  },
  watch:{
  },
  mounted:function(){
    this.weatherFetcher();
    this.forecastFetcher(3072598);
  }
}
</script>

<style lang="scss" scoped>
.weather_wrapper{
  display: grid;
  height: inherit;
  width: inherit;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media (max-width: 1024px) {
    grid-template-rows: repeat(2, 1fr);
  }

  .main_card{
    @media (min-width: 1024px) {
      grid-column: 1/2;
    }
    width: 100%;
    height: 100%
  }

  .weather_cards{
    @media (min-width: 1024px) {
      grid-column: 2/3;
    }
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(2,1fr);
    grid-template-columns: auto;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 1em;
    }
 
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }

  
}

</style>