import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.store({
  state: {
    // count: 0
  },
  mutations: {
    // addCount(state, arg1){
      // state.count += arg1
    // }
  },
  actions: {
    // getCount(context, arg1){
      // context.commit('addCount', arg1)
    // }
  },
  getters: {
    // countWithIncrement(state) {
    // return state.count + 1
    // }
  },
});
