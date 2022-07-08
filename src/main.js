import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import BX24 from './plugins/bitrix24-dev-rest';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BX24);

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

BX24.initAuth({ 
  client_id: "local.62c7299ec07418.23209779", //обязательно 
  client_secret: "EVbyQbEfZopLKXSRoE1mialUXCTq8KCI1NKXTFOHPA52nj3YG0", //обязательно 
  access_token: "dbd1c762005c70f6005c66fc000000014038074dcc95bf6b18d138c45d91f650f4ba14", //обязательно 
  domain: "b24-95rk2n.bitrix24.ru", //обязательно 
  expires_in: 1657262585672, 
  member_id: "251a7f0bbf18ea4f1c560a1ec1b27b62", 
  refresh_token: "cb50ef62005c70f6005c66fc00000001403807e0f7581a088c2023b6faad2927b43c84", 
  lang: "ru", 
  placement: "DEFAULT", 
  placement_options: {} 
})

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
