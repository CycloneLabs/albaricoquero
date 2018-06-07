import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './../component/Dashboard.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'sidebar__link--active',
  mode: 'history',
  routes: [
    { path: '/', component: Dashboard },
    { path: '*', redirect: '/' },
  ],
});

module.exports = router;
module.exports.default = router;
