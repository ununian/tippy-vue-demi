/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaults, isFunction, omit, pick } from 'lodash-es';
import { ComponentInternalInstance, h as hDemi, isVue2 } from 'vue-demi';

interface Options {
  props?: Record<string, unknown>;
  domProps?: Record<string, unknown>;
  on?: Record<string, unknown>;
}

const adaptOnsV3 = (ons: Record<string, unknown>) => {
  if (!ons) return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    if (key[0] === '!') {
      key = key.slice(1) + 'Capture';
    } else if (key[0] === '&') {
      key = key.slice(1) + 'Passive';
    } else if (key[0] === '~') {
      key = key.slice(1) + 'Once';
    }
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;

    return { ...ret, [key]: handler };
  }, {});
};

const adaptScopedSlotsV3 = (scopedSlots: unknown) => {
  if (!scopedSlots) return null;
  return Object.entries(scopedSlots).reduce((ret, [key, slot]) => {
    if (isFunction(slot)) {
      return { ...ret, [key]: slot };
    }
    return ret;
  }, {} as Record<string, Function>);
};

const h = (
  type: string | Record<string, any>,
  options: Options & any = {},
  children?: any,
) => {
  const hInner = hDemi as any;
  if (isVue2) {
    const propOut = omit(options, [
      'props',
      'domProps',
      'on',
      'class',
      'className',
      'style',
      'attrs',
      'directives',
      'scopedSlots',
      'ref',
      'key',
      'refInFor',
      'show',
      'slot',
      'slotScope',
      'slotTarget',
      'slotProps',
      'slotName',
      'slotChildren',
      'slotOptions',
    ]);
    const props = defaults(propOut, options.props || {});
    if ((type as Record<string, unknown>).props) {
      return hInner(
        type,
        {
          ...options,
          props: pick(props, Object.keys((type as Record<string, any>).props)),
          attrs: defaults(
            omit(props, Object.keys((type as Record<string, any>).props)),
            options.attrs || {},
          ),
        },
        children,
      );
    }
    return hInner(type, { ...options, props }, children);
  }

  const { props, attrs, domProps, on, scopedSlots, ...extraOptions } = options;

  const ons = adaptOnsV3(on);
  const slots = adaptScopedSlotsV3(scopedSlots) as any;
  const params = { ...extraOptions, ...props, ...attrs, ...domProps, ...ons };
  if (slots && Object.keys(slots).length) {
    return hInner(type, params, {
      default: slots?.default || children,
      ...slots,
    });
  }
  return hInner(type, params, children);
};

const slot = (defaultSlots: unknown) => {
  if (typeof defaultSlots == 'function') return defaultSlots();
  return defaultSlots;
};
export { slot };

export default h;
