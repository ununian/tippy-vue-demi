import { h, ref } from 'vue-demi';
import { TippyComponent, TippyOptions } from '../types';
import Tippy from './../components/Tippy';

export function useTippyComponent(opts: TippyOptions = {}, children?: any) {
  const instance = ref<TippyComponent>();

  return {
    instance,
    TippyComponent: h(
      Tippy,
      {
        ...(opts as any),
        onVnodeMounted: (vnode: any) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          instance.value = vnode.component.ctx;
        },
      },
      children,
    ),
  };
}
