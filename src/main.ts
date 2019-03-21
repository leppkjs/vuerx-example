import Vue from 'vue';
import VueRx from 'vue-rx';
import App from './App.vue';
import router from './router';
import Rx from 'rxjs/Rx';
import VueScrollTo from 'vue-scrollto';

Vue.config.productionTip = false;
Vue.use(VueRx, Rx);
Vue.use(VueScrollTo);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
