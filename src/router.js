import Vue from 'vue';
import Router from 'vue-router';
var Home = function () { return import(/* webpackChunkName: "home" */ './views/Home.vue'); };
// const About = () => import(/* webpackChunkName: "about" */ './views/About.vue');
var About = function () { return import(/* webpackChunkName: "about" */ './views/SubjectExample.vue'); };
var List = function () { return import(/* webpackChunkName: "list" */ './views/List.vue'); };
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
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: About,
        },
        {
            path: '/list',
            name: 'list',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: List,
        },
    ],
});
//# sourceMappingURL=router.js.map