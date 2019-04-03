import Rx from 'rxjs/Rx';
import Vue from 'vue';
import VueRx from 'vue-rx';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;
Vue.use(VueRx, Rx);
Vue.use(VueScrollTo);
// 전역 사용자 정의 디렉티브 v-focus 등록
Vue.directive('focus', {
    // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
    inserted: function (el) {
        // 엘리먼트에 포커스를 줍니다
        el.focus();
    },
});
Vue.directive('load', {
    // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
    inserted: function (el) {
        el.src = 'http://www.google.com/intl/en_ALL/images/srpr/logo1w.png';
        el.onError = '../assets/logo.png';
    },
});
new Vue({
    router: router,
    render: function (h) { return h(App); },
}).$mount('#app');
//# sourceMappingURL=main.js.map