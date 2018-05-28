<template>
  <div class="current">
    <div class="info" v-if="!loading">
      <div class="logo">
        <div :class="meteoData.icon"></div>
      </div>
      <div class="temp" >
        {{meteoData.temp}}°
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
</template>

<style lang="scss">
    .current {
      .info {
        .temp {
          font-size: 30px;
        }
      }
    }
    .spinner {
      display: flex;
      justify-content: center;
      height: 50px;
    }
</style>
<script>
// @ is an alias to /src
import Spinner from 'vue-spinner-component/src/Spinner.vue'

export default {
  name: 'currentWeather',
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
    meteoData: {
      type:Object,
      default: {
        icon: null,
        temp: null,
      }
    },
  },
};
</script>
