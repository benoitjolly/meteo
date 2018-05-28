import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import moment from 'moment';
import {cloneDeep} from 'lodash';
import _ from 'lodash';
Vue.use(Vuex);

const store = {
  state: {
    count: 0,
    currentWeather : {
      icon: null,
      temp: null,
    },
    forecastWeather: {
      firstDay: {
        d: null,
        icon: null,
        tempMin: null,
        tempMax: null,
      },
      secondDay:{
        d: null,
        icon: null,
        tempMin: null,
        tempMax: null,
      },
      thirdDay:{
        d: null,
        icon: null,
        tempMin: null,
        tempMax: null,
      },
    },
  },
  mutations: {
    SET_CURRENT_WEATHER(state, payload){
      state.currentWeather.icon = payload.weather[0].icon;
      state.currentWeather.temp = _.round(payload.main.temp);
    },
    SET_FORECAST_WEATHER(state, payload){
      let averageTempMin;
      const weekDayMin = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      let nbDay;
      let arrayDataDays = [];
      let objDay = {
        weekDay: null,
        tempMin: [],
        tempMax: [],
        listIcon: [],
      };

      let j = -1;
      let lastDay;
      for (let i in payload.list) {
        nbDay = moment.unix(payload.list[i].dt).isoWeekday()-1;

        if(nbDay != lastDay){
          arrayDataDays.push(cloneDeep(objDay));
          lastDay = nbDay;
          j++;
          arrayDataDays[j].weekDay = nbDay;
        }

        arrayDataDays[j].tempMin.push(payload.list[i].main.temp_min);
        arrayDataDays[j].tempMax.push(payload.list[i].main.temp_max);
        arrayDataDays[j].listIcon.push(payload.list[i].weather[0].icon);

      }

      state.forecastWeather.firstDay.d = weekDayMin[arrayDataDays[0].weekDay];
      state.forecastWeather.firstDay.tempMin = _.round(_.min(arrayDataDays[0].tempMin));
      state.forecastWeather.firstDay.tempMax = _.round(_.max(arrayDataDays[0].tempMax));
      state.forecastWeather.firstDay.icon =  _.chain(arrayDataDays[0].listIcon).countBy().toPairs().maxBy(_.last).head().value();

      state.forecastWeather.secondDay.d = weekDayMin[arrayDataDays[1].weekDay];
      state.forecastWeather.secondDay.tempMin = _.round(_.min(arrayDataDays[1].tempMin));
      state.forecastWeather.secondDay.tempMax = _.round(_.max(arrayDataDays[1].tempMax));
      state.forecastWeather.secondDay.icon =  _.chain(arrayDataDays[1].listIcon).countBy().toPairs().maxBy(_.last).head().value();


      state.forecastWeather.thirdDay.d = weekDayMin[arrayDataDays[2].weekDay];
      state.forecastWeather.thirdDay.tempMin = _.round(_.min(arrayDataDays[2].tempMin));
      state.forecastWeather.thirdDay.tempMax = _.round(_.max(arrayDataDays[2].tempMax));
      state.forecastWeather.thirdDay.icon =  _.chain(arrayDataDays[2].listIcon).countBy().toPairs().maxBy(_.last).head().value();
    }
  },
  actions: {
    getCurrentWeather : (context, payload) => {
      api.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=e7223130fa39ca4cd87efbc3c352d534&units=metric`).then(function(response){
        context.commit('SET_CURRENT_WEATHER', response);
      }, function(error){
          console.log(error.statusText);
      });
    },
    getForecastWeather : (context, payload) => {
      api.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload}&appid=e7223130fa39ca4cd87efbc3c352d534&units=metric`).then(function(response){
        context.commit('SET_FORECAST_WEATHER', response);
      }, function(error){
          console.log(error.statusText);
      });
    }
  },
  getters: {
    currentWeather: state => state.currentWeather,
    forecastWeather: state => state.forecastWeather,
  }
};

export default new Vuex.Store(store);