<template>
  <div class="forecast" v-bind:style="{color: cssVars.colors.midDarkestGrey}">
        <div class="time_degrees_wind" v-bind:style="{backgroundColor: cssVars.colors.mostDarkestGrey}">
            <p>{{forecastData.dt_txt.slice(-8,-3)}}</p>
            <p>{{forecastData.main.temp}} °C</p>
            <p>{{forecastData.wind.speed}} m/s</p>
        </div>
        <div class="description_humidity" v-bind:style="{backgroundColor: cssVars.colors.mostDarkestGrey}">
            <p>{{forecastData.weather[0].description}}</p>
            <p>{{forecastData.main.humidity}} %</p>
        </div>
        <div class="icon_wrapper" >
            <div class="circle" v-bind:style="{backgroundColor: cssVars.colors.midDarkestGrey}">
                <img v-bind:src="getUrl(forecastData.weather[0].icon)">
            </div>
        </div>
  </div>
</template>

<script>
import colorsWeather from '../colorsWeather';
import iconUrl from './helperFunctions/iconUrl';

export default {
    props:["forecastData"],
    data:function(){
        return{
            cssVars: colorsWeather
        }
    },
    methods:{
        getUrl:function(icon){
            return iconUrl(icon);
        }
    }
}
</script>

<style lang="scss" scoped>
$width: 320px;
$height: $width/3;
.forecast{
    width: $width;
    height: fit-content;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 2fr $height/2;
    border-radius: 20px;
    text-transform: uppercase;

    &:hover{
        width: $width+10px;
    }

    >.time_degrees_wind{
        grid-column: 1/2;
        padding-left: 10px;
    }

    >.description_humidity{
        display: flex;
        text-align: end;
        grid-column: 2/3;
        flex-direction: column;
        justify-content: end;
        align-items:flex-end;
        padding-right: $height/2 + 10px;
        
    }

    >.icon_wrapper{
        grid-column: 3/4;
        position: relative;
        >.circle{
            position: absolute;
            width: $height;
            display:flex;
            border-radius: 100%;
            top: 0;
            bottom: 0;
            right: 0;
            justify-content: center;
            align-items: center;
        }
    }
}

</style>