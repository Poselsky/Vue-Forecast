<template>
    <div>
        <weather-wrapper/>
    </div>
</template>

<script>

import WeatherWrapper from './components/weather_components/WeatherWrapper';

export default{
    name: "main-component",
    
    components:{
        'weather-wrapper': WeatherWrapper
    }
};

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
body{
    font-family: 'Lato', sans-serif;
    width: 100vw;
    height: 100%;
    margin: 0;
    overflow-x: hidden;
}

</style>

