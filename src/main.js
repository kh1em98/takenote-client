import Vue from 'vue'
import App from './App.vue'
import store from './store';
import moment from 'moment'
import {
  router
} from '../src/router';

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format("MMMM Do YYYY, hh:mm")
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')