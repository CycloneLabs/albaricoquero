import Vue, { VNode }   from 'vue';
import App              from 'App.vue';
import 'shared/icons/index.js';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render(h): VNode {
    return h(App);
  },
});
