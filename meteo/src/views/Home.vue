<template>
  <div class="home">
    <label>Sélectonner votre ville</label>
    <multiselect 
      :options="cities"
      v-model="selectedCity"
      track-by="id"
      label="nm"
      @input="getWeather(selectedCity.nm)">
    </multiselect>
    <div v-if="selectedCity.nm !== null">
      <div class="city">
        <div class="title">
          {{selectedCity.nm}}
        </div>  
      </div>
      <current-weather :meteoData="currentWeather" :loading="loadingCurrent"></current-weather>
      <forecast-weather :forecastMeteoData="forecastWeather" :loading="loadingForecast"></forecast-weather>
    </div>   
  </div>
</template>

<style lang="scss">
  .home {
    max-width: 500px;
    min-width: 50%;
    display: flex;
    flex-direction: column;
    label {
      display: flex;
      justify-content: flex-start; 
    }
    .logo{
      font-size: 50px;
    }
    .city {
        padding: 20px;
        .title{
          background-color: #734DBA;
          padding: 10px;
          text-transform: uppercase;
        }
    }
  }
</style>

<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'
import Spinner from 'vue-spinner-component/src/Spinner.vue'
import store from "@/store";
import cities from "@/assets/static/cities-fr.js";
import CurrentWeather from "@/components/currentWeather";
import ForecastWeather from "@/components/forecastWeather";

export default {
  name: 'home',
  components: {
    Multiselect,
    CurrentWeather,
    ForecastWeather,
    Spinner,
  },
  data() {
    return {
      cities: cities,
      selectedCity: {nm:'paris'},
      confSpinner: {
        speed: 0.5,
        color: '9577CB',
        size: 20,
      }
    };
  },
  computed: {
    currentWeather() {
      return this.$store.getters.currentWeather;
    },
    forecastWeather() {
      return this.$store.getters.forecastWeather;
    },
    loadingCurrent() {
      return this.$store.getters.loadingCurrent;
    },
    loadingForecast() {
      return this.$store.getters.loadingForecast;
    },
  },
  methods: {
    getWeather(city) {
      this.$store.dispatch('getCurrentWeather',city);
      this.$store.dispatch('getForecastWeather',city);
    }
  },
  mounted: function(){
    this.getWeather('paris');
  },
};
</script>
