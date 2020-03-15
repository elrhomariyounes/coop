import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bulma/css/bulma.css';
import axios from 'axios'
//Bootstrap vue
Vue.use(BootstrapVue);

// Axios
window.axios = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: {
    'Authorization' : '7a35f161765bb57a7e047e59faf056e8084c8ba6'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    window.axios.interceptors.request.use((config)=>{
      if(this.$store.state.token){
        config.url+='?token='+this.$store.state.token;
      }
      return config;
    },error => {
      return console.log(error)
    })
  }
}).$mount('#app')
