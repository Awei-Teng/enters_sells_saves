// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import { Table,tableColumn } from 'element-ui'
import 'element-ui/lib/theme-chalk/table-column.css';
Vue.use(Table);
Vue.use(tableColumn);

require('es6-promise').polyfill();
import axios from 'axios'
Vue.prototype.$http = axios


import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);
window.http = "http://192.168.0.124:8080"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
