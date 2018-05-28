<template>
  <div class="home">

    <!-- {{currentWeather}}
    {{forecastWeather}} -->
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
      <div class="current">
        <div class="info" v-if="!loadingCurrent">
          <div class="logo">
            {{currentWeather.icon}}
          </div>
          <div class="temp" >
            {{currentWeather.temp}}°
          </div>
        </div>
        <div class="spinner">
          <spinner
            :status="loadingCurrent"
            :color="confSpinner.color"
            :size="confSpinner.size"
            :speed="confSpinner.speed">
          </spinner>
        </div>
      </div>
      <div class="forecast">
        <div class="days" v-if="!loadingForecast">
          <span>{{forecastWeather.firstDay.d}}</span>
          <span>{{forecastWeather.secondDay.d}}</span>
          <span>{{forecastWeather.thirdDay.d}}</span>
        </div>
        <div>
          <div class="content"  v-if="!loadingForecast">
            <div class="info-forecast">
              <div class="logo">
                {{forecastWeather.firstDay.icon}}
              </div>
              <div class="tempMax">
                {{forecastWeather.firstDay.tempMax}}°
              </div>
              <div class="tempMin">
                {{forecastWeather.firstDay.tempMin}}°
              </div>
            </div>
            <div class="info-forecast">
              <div class="logo">
                {{forecastWeather.secondDay.icon}}
              </div>
              <div class="tempMax">
                {{forecastWeather.secondDay.tempMax}}°
              </div>
              <div class="tempMin">
                {{forecastWeather.secondDay.tempMin}}°
              </div>
            </div>
            <div class="info-forecast">
              <div class="logo">
                <div class="wi-icon-800"></div>
                {{forecastWeather.thirdDay.icon}}
              </div>
              <div class="tempMax">
                {{forecastWeather.thirdDay.tempMax}}°
              </div>
              <div class="tempMin">
                {{forecastWeather.thirdDay.tempMin}}°
              </div>
            </div>
          </div>
          <div class="spinner">
            <spinner
              :status="loadingForecast"
              :color="confSpinner.color"
              :size="confSpinner.size"
              :speed="confSpinner.speed">
            </spinner>
          </div>
        </div>
      </div>
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
    .city {
        padding: 20px;
        .title{
          background-color: #734DBA;
          padding: 10px;
          text-transform: uppercase;
        }
    }
    .current {
      .info {
        .temp {
          font-size: 30px;
        }
      }
    }
    .forecast {
      padding: 20px;
      .days{
        background-color: #734DBA;
        padding: 10px;
        text-transform: uppercase;
        display: flex;
        justify-content: space-around;
      }
      .content {
        display: flex;
        justify-content: space-around;
        padding: 10px;
      }
    }
    .spinner {
      display: flex;
      justify-content: center;
    }
  }
</style>
<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'
import Spinner from 'vue-spinner-component/src/Spinner.vue'
import HelloWorld from '@/components/HelloWorld.vue';
import store from "../store";
import cities from "../assets/static/cities-fr.js";

export default {
  name: 'home',
  components: {
    HelloWorld,
    Multiselect,
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
    count () {
      return store.state.count;
    },
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
    increment() {
      store.commit('increment');
    },
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
