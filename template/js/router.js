import Vue from 'vue';
import VueRouter from 'vue-router';

const First = () => import(/* webpackChunkName: "first" */ 'component/First');
const Second = () => import(/* webpackChunkName: "second" */ 'component/Second');

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/first', component: First },
    { path: '/second', component: Second },
    { path: '*', redirect: '/first' },
  ],
});

export default router;
