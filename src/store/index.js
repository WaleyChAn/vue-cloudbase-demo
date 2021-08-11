import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cloudbaseAuth: null
  },
  mutations: {
    SET_CLOUDBASE_AUTH (state, value) {
      state.cloudbaseAuth = value
    }
  },
  getters: {

  },
  actions: {

  }
})
