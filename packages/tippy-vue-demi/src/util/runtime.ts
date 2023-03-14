import * as Demi from 'vue-demi';
import type { VNode } from 'vue-demi';

export const isVNode = (node: Object) => {
  if (Demi.isVue3) {
    return Demi.isVNode(node);
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
  if (Demi.isVue3) {
    return Demi.render(vNode, dom);
  }
  if (Demi.Vue2) {
    const vm = new Demi.Vue2({
      render: (h: any) => h(vNode as any),
    });
    vm.$mount(dom);
  }
};
