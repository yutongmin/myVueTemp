import _ from 'lodash'
import Vue from 'vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import componentRegisterFn from "@/controller/componentRegister"
import './plugins/element'
import App from "./App.vue"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
