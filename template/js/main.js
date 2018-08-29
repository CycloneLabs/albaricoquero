import Vue from 'vue';
import App from 'component/App.vue';

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render(h) {
    return h(App);
  },
});
