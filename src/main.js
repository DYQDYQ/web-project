import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import iView from 'iview';
import './my-theme/index.less';

//导入接口api
import {viewApi, processApi, roomApi, qualityApi, safeApi, coordinateApi, dataApi, approvalApi, materialApi,wisdomApi, businessManageApi, modleManageApi, MeetingApi, aboutusApi} from './api'

Axios.interceptors.response.use(response => {
     // 判断是否
    if (response.data.retcode === 401 || response.data.retcode === '401') {
      router.push({name: 'login'})
    }
 })
Vue.prototype.$axios = Axios;
Vue.use(iView)

Vue.config.productionTip = false

window.vuebox = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
