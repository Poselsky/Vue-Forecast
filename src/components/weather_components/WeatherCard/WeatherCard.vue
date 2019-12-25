<template>
  <div class="weather_card" v-bind:style="cssVars" v-on:click="$emit('show-id',weatherData.id)">
      <!--{{weatherData}}-->

    <!--Upper PART -->
    <div class="upper">
      <div class="time_degrees">
        <p class="title">{{weatherData.main.temp}}°C</p>
        <p>{{getTime(weatherData.dt)}}</p>
      </div>
      <div class="icon" v-bind:style="{backgroundColor: cssVars.color}">
        <img v-bind:src="getUrl(weatherData.weather[0].icon)"/>
      </div>
      <div class="town">
        <p class="title">{{weatherData.name}}</p>
      </div>
    </div>

    <!--Middle PART -->
    <div class="middle">
      <div class="state" v-bind:style="{backgroundColor: cssVars.color, color: cssVars.backgroundColor}">
        <p>{{weatherData.weather[0].description}}</p>
        <p>Humidity: {{weatherData.main.humidity}}%</p>
      </div>
    </div>

    <!--Down PART -->
    <div class="lower">
      <div class="coordinates">
        <p>Lat: {{weatherData.coord.lat}}</p>
        <p>Lon: {{weatherData.coord.lon}}</p>
      </div>
      <div class="sunrise_sunset">
        <p>{{weatherData.main.temp_min}}°C > {{weatherData.main.temp_max}}°C</p>
        <p>{{weatherData.main.pressure}} hPa</p>
      </div>
    </div>
  </div>
</template>


<script>
import ColorsWeather from '../../colorsWeather.js';
import getIconUrl from '../../../helperFunctions/iconUrl';

export default {
  props:["weatherData"],
  data:function(){
    return{
      cssVars:{
        backgroundColor: ColorsWeather.colors.mostDarkestGrey,
        color: ColorsWeather.colors.midDarkGrey
      }
    }
  },
  methods:{
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
    getUrl(icon){
      return getIconUrl(icon);
    }
  }
}
</script>

<style lang="scss" scoped>
.weather_card{
  width:400px;
  height: 400px;
  display: grid;
  grid-template-rows: repeat(3,1fr);
  
  >.upper{
    grid-row: 1/2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-left:20px;
    padding-right: 20px;
    
    >.time_degrees{
      grid-column: 1/2;
      justify-self: start;
      line-height: 0px;
    }

    >.icon{
      display: flex;
      grid-column: 2/3;
      width:50%;
      height: 50%;
      border-radius: 100%;
      justify-self: center;
      align-self: flex-end;
      justify-content: center;
      align-content: center;
      img{
        width: 100%;
        height: 100%;
      }
    }

    >.town{
      grid-column: 3/4;
      align-self: flex-start;
      text-align: end;
      position: relative;
      .title{
        position: absolute;
        right: 0;
      }
    }
  }

  >.middle{
    grid-row: 2/3;
    display:grid;
    >.state{
      display: flex;
      flex-direction: column;
      width:80%;
      height: 80%;
      justify-self: center;
      align-self: center;
      border-radius: 50px;
      justify-content: center;
      align-items:center;
      line-height: 0;
      text-transform: uppercase;


      p{
        font-size: 1.5rem;
      }
    }
  }
    
  >.lower{
    grid-row: 3/4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-left:20px;
    padding-right: 20px;
    >.coordinates{
      grid-column: 1/2;
      align-self: flex-end;
    }

    >.sunrise_sunset{
      grid-column: 3/4;
      align-self: flex-end;
      text-align: end;
    }
  }
}

.title{
  font-size: 2rem;
}
</style>

