import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './styles/main.scss';

/* plugins */
import './plugins/axios';
import './plugins/element-ui';

/* mixins */
import { AxiosMixin } from './mixins/axios';

import { createProvider } from './vue-apollo';
Vue.mixin(AxiosMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
