/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { isVue3, VNode, Vue2 } from 'vue-demi';

export const isVNode = (node: Object) => {
  if (isVue3) {
    // @ts-ignore
    const Vue3IsNode = require('vue-demi').isVNode;
    return Vue3IsNode(node);
  }
  return (
    typeof node === 'object' &&
    node !== null &&
    (node.hasOwnProperty('tag') ||
      node.hasOwnProperty('componentOptions') ||
      node.hasOwnProperty('text'))
  );
};

export const render = (vNode: VNode, dom: HTMLElement) => {
  if (isVue3) {
    // @ts-ignore
    const Vue3Render = require('vue-demi').render;
    return Vue3Render(vNode, dom);
  }
  if (Vue2) {
    const vm = new Vue2({
      render: h => h(vNode as any),
    });
    vm.$mount(dom);
  }
};
