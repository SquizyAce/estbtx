import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Bitrix24 from './plugins/vue-bitrix24';

Vue.use(Bitrix24);

Vue.config.productionTip = false

Bitrix24.init().then(($BX24) => {
  new Vue({
    router,
    store,
    provide: { $BX24 },
    render: (h) => h(App),
  }).$mount('#app');
});