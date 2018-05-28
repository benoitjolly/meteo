import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import api from './api';

Vue.use(Vuex);

const store = {
  state: {
    loadingCurrent: false,
    currentWeather: {
      icon: null,
      temp: null,
    },
    loadingForecast: false,
    forecastWeather: [],
  },
  mutations: {
    SET_CURRENT_WEATHER(state, payload) {
      state.currentWeather.icon = `wi-icon-${payload.weather[0].id}`;
      state.currentWeather.temp = _.round(payload.main.temp);
    },
    SET_CURRENT_LOADING(state, payload) {
      state.loadingCurrent = payload;
    },
    SET_FORECAST_WEATHER(state, payload) {
      const weekDayMin = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      let nbDay;
      const arrayDataDays = [];
      const arrayDataDaysCleaned = [];
      const objDay = {
        weekDay: null,
        tempMin: [],
        tempMax: [],
        listIcon: [],
      };

      let j = -1;
      let lastDay;
      for (let i = 0; i < payload.list.length; i += 1) {
        nbDay = moment.unix(payload.list[i].dt).isoWeekday() - 1;

        if (nbDay !== lastDay) {
          const clone = _.cloneDeep(objDay);
          arrayDataDays.push(clone);
          lastDay = nbDay;
          j += 1;
          arrayDataDays[j].weekDay = nbDay;
        }

        arrayDataDays[j].tempMin.push(payload.list[i].main.temp_min);
        arrayDataDays[j].tempMax.push(payload.list[i].main.temp_max);
        arrayDataDays[j].listIcon.push(`wi-icon-${payload.list[i].weather[0].id}`);
      }

      const meteoObj = {
        d: null,
        icon: null,
        tempMin: null,
        tempMax: null,
      };

      for (let day = 0; day < arrayDataDays.length; day += 1) {
        const meteoDay = _.cloneDeep(meteoObj);
        meteoDay.d = weekDayMin[arrayDataDays[day].weekDay];
        meteoDay.tempMin = _.round(_.min(arrayDataDays[day].tempMin));
        meteoDay.tempMax = _.round(_.max(arrayDataDays[day].tempMax));
        meteoDay.icon = _.chain(arrayDataDays[day].listIcon).countBy().toPairs().maxBy(_.last)
          .head()
          .value();
        arrayDataDaysCleaned.push(meteoDay);
      }

      state.forecastWeather = arrayDataDaysCleaned;
    },
    SET_FORECAST_LOADING(state, payload) {
      state.loadingForecast = payload;
    },
  },
  actions: {
    getCurrentWeather: (context, payload) => {
      context.commit('SET_CURRENT_LOADING', true);
      api.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=e7223130fa39ca4cd87efbc3c352d534&units=metric`).then((response) => {
        context.commit('SET_CURRENT_WEATHER', response);
        context.commit('SET_CURRENT_LOADING', false);
      }, (error) => {
        console.log(error.statusText);
        context.commit('SET_CURRENT_LOADING', false);
      });
    },
    getForecastWeather: (context, payload) => {
      context.commit('SET_FORECAST_LOADING', true);
      api.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload}&appid=e7223130fa39ca4cd87efbc3c352d534&units=metric`).then((response) => {
        context.commit('SET_FORECAST_WEATHER', response);
        context.commit('SET_FORECAST_LOADING', false);
      }, (error) => {
        console.log(error.statusText);
        context.commit('SET_FORECAST_LOADING', false);
      });
    },
  },
  getters: {
    currentWeather: state => state.currentWeather,
    forecastWeather: state => state.forecastWeather,
    loadingCurrent: state => state.loadingCurrent,
    loadingForecast: state => state.loadingForecast,
  },
};

export default new Vuex.Store(store);
