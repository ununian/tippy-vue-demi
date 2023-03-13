import { Instance } from 'tippy.js';
import { defineComponent, ref } from 'vue-demi';
import { useSingleton } from '../composables';
import tippy, { DefaultProps } from 'tippy.js';
import h from '../util/h-demi';

const booleanProps = [
  'a11y',
  'allowHTML',
  'arrow',
  'flip',
  'flipOnUpdate',
  'hideOnClick',
  'ignoreAttributes',
  'inertia',
  'interactive',
  'lazy',
  'multiple',
  'showOnInit',
  'touch',
  'touchHold',
];

const props: Record<string, any> = {};

Object.keys(tippy.defaultProps).forEach((prop: string) => {
  if (booleanProps.includes(prop)) {
    props[prop] = {
      type: Boolean,
      default: function () {
        return tippy.defaultProps[prop as keyof DefaultProps] as Boolean;
      },
    };
  } else {
    props[prop] = {
      default: function () {
        return tippy.defaultProps[prop as keyof DefaultProps];
      },
    };
  }
});

const TippySingleton = defineComponent({
  props,
  setup(props) {
    const instances = ref<Instance<any>[]>([]);

    const { singleton } = useSingleton(instances, props);

    return { instances, singleton };
  },
  mounted() {
    const parent = this.$el.parentElement;
    const elements = parent.querySelectorAll('[data-v-tippy]');

    this.instances = Array.from(elements)
      .map((el: any) => el._tippy)
      .filter(Boolean);

    this.singleton?.setInstances(this.instances);
  },
  render() {
    const slot = this.$slots.default ? this.$slots.default() : [];

    return h({
      default: () => slot,
    });
  },
});

export default TippySingleton;
