import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue');
const SubjectExample = () => import(/* webpackChunkName: "subject-example" */ './views/SubjectExample.vue');
const AutoComplete = () => import(/* webpackChunkName: "auto-complete" */ './views/AutoComplete.vue');
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/subject-example',
            name: 'SubjectExample',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: SubjectExample,
        },
        {
            path: '/auto-complete',
            name: 'autoComplete',
            component: AutoComplete,
        },
    ],
});
//# sourceMappingURL=router.js.map