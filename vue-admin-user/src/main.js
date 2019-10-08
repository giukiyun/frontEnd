import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(router)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
