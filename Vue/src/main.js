import './assets/styles/main.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routes'
// import store from './store/store'

Vue.use(VueRouter)


const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return  {selector: to.hash}
    }
    return {x:0,y:0}
  }
})

export const EventBus = new Vue()

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
