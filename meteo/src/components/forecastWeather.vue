<template>
    <div class="forecast">
      <div class="days" v-if="!loading">
          <span v-for="day in forecastMeteoData">
            {{day.d}}
          </span>
      </div>
      <div>
          <div class="content"  v-if="!loading">
              <div class="info-forecast" v-for="day in forecastMeteoData">
                  <div class="logo">
                      <div :class="day.icon"></div>
                  </div>
                  <div class="tempMax">
                      {{day.tempMax+'°'}}
                  </div>
                  <div class="tempMin">
                      {{day.tempMin+'°'}}
                  </div>
              </div>
          </div>
          <div class="spinner" v-show="loading">
              <spinner
                  :status="loading"
                  :color="confSpinner.color"
                  :size="confSpinner.size"
                  :speed="confSpinner.speed">
              </spinner>
          </div>
      </div>
    </div>
</template>

<style lang="scss">
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
      height: 100px;
    }
</style>
<script>

import Spinner from 'vue-spinner-component/src/Spinner.vue'

export default {
  name: 'forecastWeather',
  components: {
    Spinner,
  },
  data() {
    return {
      confSpinner: {
        speed: 0.5,
        color: '9577CB',
        size: 20,
      }
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    forecastMeteoData:{
      type: Array,
      default: []
    }
  },
};
</script>
