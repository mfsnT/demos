import Vue from 'vue'
import App2 from './App2'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.less'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#preview-page',
  template: '<App2/>',
  components: { App2 }
})
