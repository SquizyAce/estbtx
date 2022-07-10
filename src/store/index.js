import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import uses from './modules/uses'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    list, uses
  }
})
