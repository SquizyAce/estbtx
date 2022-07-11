import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import BX24 from './plugins/bitrix24-dev-rest';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BX24);

Vue.use(Vuelidate);

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

// BX24.initAuth({ 
//   client_id: "local.62c7299ec07418.23209779", //обязательно 
//   client_secret: "EVbyQbEfZopLKXSRoE1mialUXCTq8KCI1NKXTFOHPA52nj3YG0", //обязательно 
//   access_token: "2f1cc962005c70f6005c66fc00000001403807b97ca5a22fafbcf15ee0b052bfe545ab", //обязательно 
//   domain: "b24-95rk2n.bitrix24.ru", //обязательно 
//   expires_in: 1657347150074, 
//   member_id: "251a7f0bbf18ea4f1c560a1ec1b27b62", 
//   refresh_token: "1f9bf062005c70f6005c66fc000000014038076800e402ac7bbcac333646a8e2becbb7", 
//   lang: "ru", 
//   placement: "CRM_DEAL_DETAIL_TAB", 
//   placement_options: {} 
// })

BX24.init(function(){
  console.log('Инициализация завершена!', BX24.isAdmin());
  BX24.callMethod(
    'placement.unbind',
    {
      'PLACEMENT' : 'CRM_DEAL_DETAIL_TAB',
    },
    function(result)
    {
        if(result.error())
            console.log("Error: " + result.error());
        else
        {
          BX24.callMethod(
            'placement.bind',
            {
              'PLACEMENT' : 'CRM_DEAL_DETAIL_TAB',
              'HANDLER' : window.location.href,
              'TITLE' : 'Расходы по сделкам'
            },
            function(result)
            {
                if(result.error())
                console.log("Error: " + result.error());
            }
          );
        }
    }
  );
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});

