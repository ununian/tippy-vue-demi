import { createApp } from 'vue';
import App from './index.vue';
import '../../tippy-vue-demi/dist/style.css';

// This type error occurs when the 'vue-demi' package refs to Vue 2.
// However, it doesn't matter because when you use the 'test-v3' command,
// 'vue-demi-switch' changes the pointing Vue version to 3.
createApp(App).mount('#app');
