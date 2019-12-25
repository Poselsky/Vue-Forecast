<template>
    <div class="weather_now">
        <div class="circle_wrapper" >
            <div class="circle" v-bind:style="{backgroundColor: cssVars.colors.colors.midDarkestGrey}">
                <div class="image">
                </div>
            </div>
        </div>
        <div class="weather" v-bind:style="{backgroundColor: cssVars.colors.colors.mostDarkestGrey }">
            <p class="weather_desc">{{weatherDataNow.weatherDesc}}</p>
            <p class="humidity">Humidity: {{weatherDataNow.main.humidity}}%</p>
            <p class="wind">Wind speed: {{weatherDataNow.wind.speed}} m/s</p>
            <p class="temperatures">{{weatherDataNow.main.temp_min}}°C > {{weatherDataNow.main.temp_max}}°C </p>
        </div>
    </div>
</template>

<script>
import ColorsWeather from '../../colorsWeather';
import setBackgroundByImage from '../../../helperFunctions/setBackgroundByImage';

export default {
    props:["weatherDataNow"],
    methods: {
        addCssToChildren(){
            const children = document.querySelector('.weather').children;
            [].forEach.call(children, ((el, index) => {
                if(index % 2 == 0){
                    el.style.backgroundColor = this.cssVars.colors.colors.midDarkestGrey;
                    el.style.color = this.cssVars.colors.colors.mostDarkGrey;
                }else {
                    el.style.backgroundColor = this.cssVars.colors.colors.mostDarkGrey;
                    el.style.color = this.cssVars.colors.colors.midDarkestGrey;
                }
            }));
        },
        weatherIconBackgroundColor(icon, selector){
            setBackgroundByImage(icon,selector);
        }
    },
    data: function(){
        return{
            cssVars:{
                colors : ColorsWeather
            }
        }
    },
    mounted:function(){
        this.addCssToChildren();
        this.weatherIconBackgroundColor(this.weatherDataNow.icon, document.querySelector('.image'));
    }
}
</script>

<style lang="scss" scoped>
$width : 250px;
.weather_now{
    display:grid;
    grid-template-rows: $width/2 1fr;
    width: $width;
    text-transform: uppercase;
    font-size: 1.2rem;
    text-align: center;
    >.circle_wrapper{
        grid-row: 1/2;
        border-radius: 100% 100% 0 0;
        position: relative;
        width: 100%;
        height: $width;
        
        >.circle{
            display: flex;
            position: absolute;
            right:0;
            left: 0;
            top: 0;
            height: 100%;
            border-radius: 100%;
            justify-content: center;
            align-items: center;
            >.image{
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                width: 80%;
                height: 80%;
                
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
        }
    }

    >.weather{
        grid-row: 2/3;
        padding-top: $width/2 + 20px;
        border-radius: 0 0 50px 50px;

        display:grid;
        grid-template-rows: repeat(4, 1fr);
        row-gap: 2%;
        padding-bottom: 40px;
        >*{
            display: flex;
            justify-self: center;
            align-self: center;
            align-items: center;
            justify-content: center;
            width: 80%;
            height: 80%;
        }
        
        >:first-child{
            border-radius: 20px 20px 0 0;
        }
        >:last-child{
            border-radius: 0 0 20px 20px;
            
        }
    } 
}

</style>