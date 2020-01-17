import Vue from "vue";
import Vuex from "vuex";

import playersModule from './playersModule'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playersModule: playersModule
  },
});