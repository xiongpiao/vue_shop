import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
// vue.use(axios)
Vue.use(ElementUI)
import './assets/css/global.css'


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
