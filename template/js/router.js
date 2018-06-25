import Vue from 'vue';
import VueRouter from 'vue-router';

const First = () => import(/* webpackChunkName: "first" */ './../component/First.vue');
const Second = () => import(/* webpackChunkName: "second" */ './../component/Second.vue');

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'sidebar__link--active',
  mode: 'history',
  routes: [
    { path: '/first', component: First },
    { path: '/second', component: Second },
    { path: '*', redirect: '/first' },
  ],
});

module.exports = router;
module.exports.default = router;
