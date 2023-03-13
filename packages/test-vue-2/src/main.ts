import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './index.vue';

import '../../tippy-vue-demi/dist/style.css';

Vue.use(VueCompositionAPI);
new Vue(App).$mount('#app');
