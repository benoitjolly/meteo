<template>
  <div class="home">
    <img src="../assets/logo.png">
    {{currentWeather}}
    {{forecastWeather}}
    {{cities}}
    <button class="button counter__increment" @click="getWeather"><i class="fa fa-plus"></i></button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import store from "../store";
import cities from "../assets/static/cities-fr.js";

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      cities: cities,
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
    }
  },
  methods: {
    increment() {
      store.commit('increment');
    },
    getWeather(city) {
      city = 'paris';
      this.$store.dispatch('getCurrentWeather',city);
      this.$store.dispatch('getForecastWeather',city);
    }
  },
  mounted: function(){
    this.getWeather('paris');
  },
};
</script>
