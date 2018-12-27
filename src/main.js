import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './Routes'

import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.use(Datetime)

Vue.use(router)

Vue.config.productionTip = false
Vue.use(require('vue-moment'));

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')