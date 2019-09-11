import Vue       from 'vue';
import App       from 'component/App';
import getConfig from 'utils/getConfig/';

import 'app/icons/';

getConfig()
  .then((config) => {
    Vue.prototype.$config = config;

    // eslint-disable-next-line no-new
    new Vue({
      el: '#app',
      render: h => h(App),
    });
  });
