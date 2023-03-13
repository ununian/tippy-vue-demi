// import {
//   h,
//   defineComponent,
//   install,
//   getCurrentInstance,
//   // This 'Component' type is being used to create a `d.ts` file.
//   //
//   // The 'Component' type exists only in Vue 3,
//   // so if you switch to Vue 2 with the `test-v2` script, a type error occurs.
//   //
//   // However, this is not a real error, and the build is performed normally in a Vue 2 switched env.
//   // Of course, if you switch to Vue 3 with the `test-v3` script, the type error disappears.
//   Component,
//   Plugin,
// } from 'vue-demi';

// install();

// // Used to resolve type errors.
// // (https://github.com/vueuse/vue-demi/issues/152#issuecomment-1173634921)
// const vm = getCurrentInstance();
// const h$1 = h.bind(vm);

// export const MyComponent: Component = defineComponent({
//   render() {
//     return h$1('p', 'from vue component');
//   },
// });

// const MyPluginComponent: Component = defineComponent({
//   render() {
//     return h$1('p', '/from vue plugin component');
//   },
// });

// export const myPlugin: Plugin = {
//   install: Vue => {
//     Vue.component('MyPluginComponent', MyPluginComponent);
//   },
// };

import tippy, {
  sticky,
  inlinePositioning,
  followCursor,
  animateFill,
  roundArrow,
} from 'tippy.js';

import Tippy from './components/Tippy';
import TippySingleton from './components/TippySingleton';
import directive from './directive';
import plugin from './plugin';

// import { useTippy } from './composables/useTippy';
// import { useTippyComponent } from './composables/useTippyComponent';
// import { useSingleton } from './composables/useSingleton';
import 'tippy.js/dist/tippy.css'; // optional for styling

const setDefaultProps = tippy.setDefaultProps;

setDefaultProps({
  ignoreAttributes: true,
  plugins: [sticky, inlinePositioning, followCursor, animateFill],
});

export {
  // useTippy,
  // useTippyComponent,
  // useSingleton,
  roundArrow,
  tippy,
  setDefaultProps,
  Tippy,
  TippySingleton,
  directive,
  plugin,
};

export * from './types';
export default plugin;
