import _ from 'lodash'
import Vue from 'vue'
import Application, {AppConfig, APP_HOOKS} from '@/utils/app'
import './registerServiceWorker'
import router from './router'
import store from './store'
import appMgr from "@/controller/appMgr";
import storeMgr from "@/store/storeMgr"
import componentRegisterFn from "@/controller/componentRegister"
import './plugins/element'
// import './styles/common.css'
import App from "./App.vue"

Vue.config.productionTip = false

/**
 * WebApp配置
 */
const appConfig: AppConfig = {
  storeMgr,

  hooks: {
    [APP_HOOKS.beforeInit]: appMgr.appBeforeInit,
    [APP_HOOKS.initialized]: appMgr.appInitialized,
  },

  router,
  store,
  appComponent: App,

  componentRegisterFn,
}

const app = new Application(appConfig)
app.start()



// 默认配置
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
