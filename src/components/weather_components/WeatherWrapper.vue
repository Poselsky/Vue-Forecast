<template>
    <div class="weather_wrapper" v-if="weather.loaded" >
      <div class="main_card" v-bind:style="{ backgroundColor: colors.colors.backgroundColor}">
        <main-weather-card v-if="forecast.loaded" v-bind:weatherData="weather.data.firstEl" v-bind:forecastData="forecast.data"/>
        <div class="lds_ellipsis" v-else>
          <div v-for="el in Array.from(Array(4).keys())" v-bind:key="el" v-bind:style="{backgroundColor: colors.colors.mostDarkestGrey}">
          </div>
        </div>
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
      lat: process.env.VUE_APP_LAT,
      lon: process.env.VUE_APP_LON,
      colors: colorsWeather,
      gap: "2px",
    }
  },
  methods: {
    weatherFetcher: function() {
      console.log(process.env)
      axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${this.lat}&lon=${this.lon}&cnt=10&appid=${this.apiKey}&mode=json&units=metric`)
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
      const percent = parent.clientWidth / 20;
      if(event.deltaY > 0){
        parent.scrollLeft+=percent;
      } else if(event.deltaY < 0) {
        parent.scrollLeft -=percent;
      }

      //Preventing default, if scroll is not on the end

      const scrollLeftOffset = event.currentTarget.scrollLeft;
      //2 pixels on left and right
      const jsFloatError = 2;
      if(scrollLeftOffset > jsFloatError && (event.currentTarget.clientWidth + scrollLeftOffset) < event.currentTarget.scrollWidth - jsFloatError){
        event.preventDefault();
      }

    },
    addBackground(event){
      event.currentTarget.children.forEach(el => {
        el.style.backgroundColor = this.colors.colors.midDarkestGrey;
      });

      console.log('loading')
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
    height: 100%;
    display: grid;
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
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }
}

.lds_ellipsis {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  justify-self: center;
  margin-top: 10%;
}
.lds_ellipsis div {
  position: absolute;
  top: 27px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds_ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds_ellipsis1 0.6s infinite;
}
.lds_ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds_ellipsis2 0.6s infinite;
}
.lds_ellipsis div:nth-child(3) {
  left: 36px;
  animation: lds_ellipsis2 0.6s infinite;
}
.lds_ellipsis div:nth-child(4) {
  left: 55px;
  animation: lds_ellipsis3 0.6s infinite;
}
@keyframes lds_ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds_ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds_ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 0);
  }
}



</style>