import Vue from 'vue';
import VueRx from 'vue-rx';
import App from './App.vue';
import router from './router';
import Rx from 'rxjs/Rx';

Vue.config.productionTip = false;
Vue.use(VueRx, Rx);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
