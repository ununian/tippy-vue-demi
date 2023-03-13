import {
  defineComponent,
  ref,
  onMounted,
  nextTick,
  watch,
  unref,
  reactive,
  PropType,
  isVue2,
} from 'vue-demi';
import { TippyOptions } from '../types';
import { useTippy } from '../composables';
import tippy from 'tippy.js';
import h from '../util/h-demi';

const TippyComponent = defineComponent({
  props: {
    to: {
      type: [String, Function] as PropType<string | Element>,
    },
    tag: {
      type: String,
      default: 'span',
    },
    contentTag: {
      type: String,
      default: 'span',
    },
    contentClass: {
      type: String,
      default: null,
    },
    appendTo: { default: () => tippy.defaultProps['appendTo'] },
    aria: { default: () => tippy.defaultProps['aria'] },
    delay: { default: () => tippy.defaultProps['delay'] },
    duration: { default: () => tippy.defaultProps['duration'] },
    getReferenceClientRect: {
      default: () => tippy.defaultProps['getReferenceClientRect'],
    },
    hideOnClick: {
      type: [Boolean, String],
      default: () => tippy.defaultProps['hideOnClick'],
    },
    ignoreAttributes: {
      type: Boolean,
      default: () => tippy.defaultProps['ignoreAttributes'],
    },
    interactive: {
      type: Boolean,
      default: () => tippy.defaultProps['interactive'],
    },
    interactiveBorder: {
      default: () => tippy.defaultProps['interactiveBorder'],
    },
    interactiveDebounce: {
      default: () => tippy.defaultProps['interactiveDebounce'],
    },
    moveTransition: { default: () => tippy.defaultProps['moveTransition'] },
    offset: { default: () => tippy.defaultProps['offset'] },
    onAfterUpdate: { default: () => tippy.defaultProps['onAfterUpdate'] },
    onBeforeUpdate: { default: () => tippy.defaultProps['onBeforeUpdate'] },
    onCreate: { default: () => tippy.defaultProps['onCreate'] },
    onDestroy: { default: () => tippy.defaultProps['onDestroy'] },
    onHidden: { default: () => tippy.defaultProps['onHidden'] },
    onHide: { default: () => tippy.defaultProps['onHide'] },
    onMount: { default: () => tippy.defaultProps['onMount'] },
    onShow: { default: () => tippy.defaultProps['onShow'] },
    onShown: { default: () => tippy.defaultProps['onShown'] },
    onTrigger: { default: () => tippy.defaultProps['onTrigger'] },
    onUntrigger: { default: () => tippy.defaultProps['onUntrigger'] },
    onClickOutside: { default: () => tippy.defaultProps['onClickOutside'] },
    placement: { default: () => tippy.defaultProps['placement'] },
    plugins: { default: () => tippy.defaultProps['plugins'] },
    popperOptions: { default: () => tippy.defaultProps['popperOptions'] },
    render: { default: () => tippy.defaultProps['render'] },
    showOnCreate: {
      type: Boolean,
      default: () => tippy.defaultProps['showOnCreate'],
    },
    touch: {
      type: [Boolean, String, Array],
      default: () => tippy.defaultProps['touch'],
    },
    trigger: { default: () => tippy.defaultProps['trigger'] },
    triggerTarget: { default: () => tippy.defaultProps['triggerTarget'] },
    animateFill: {
      type: Boolean,
      default: () => tippy.defaultProps['animateFill'],
    },
    followCursor: {
      type: [Boolean, String],
      default: () => tippy.defaultProps['followCursor'],
    },
    inlinePositioning: {
      type: Boolean,
      default: () => tippy.defaultProps['inlinePositioning'],
    },
    sticky: {
      type: [Boolean, String],
      default: () => tippy.defaultProps['sticky'],
    },
    allowHTML: {
      type: Boolean,
      default: () => tippy.defaultProps['allowHTML'],
    },
    animation: { default: () => tippy.defaultProps['animation'] },
    arrow: { default: () => tippy.defaultProps['arrow'] },
    content: { default: () => tippy.defaultProps['content'] },
    inertia: { default: () => tippy.defaultProps['inertia'] },
    maxWidth: { default: () => tippy.defaultProps['maxWidth'] },
    role: { default: () => tippy.defaultProps['role'] },
    theme: { default: () => tippy.defaultProps['theme'] },
    zIndex: { default: () => tippy.defaultProps['zIndex'] },
  },
  emits: ['state'],
  setup(props, { slots, emit }) {
    const elem = ref<Element>();
    const contentElem = ref<Element>();
    const mounted = ref(false);

    const getOptions = () => {
      const options = { ...props } as any as TippyOptions;
      for (const prop of ['to', 'tag', 'contentTag', 'contentClass']) {
        if (options.hasOwnProperty(prop)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete options[prop];
        }
      }

      return options;
    };

    let target: any = elem;

    if (props.to) {
      if (typeof Element !== 'undefined' && props.to instanceof Element) {
        target = () => props.to;
      } else if (typeof props.to === 'string' || props.to instanceof String) {
        target = () => document.querySelector(props.to as any);
      }
    }

    const tippy = useTippy(target, getOptions());

    onMounted(() => {
      mounted.value = true;

      nextTick(() => {
        if (slots.content) tippy.setContent(() => contentElem.value);
      });
    });

    watch(
      tippy.state,
      () => {
        emit('state', unref(tippy.state));
      },
      { immediate: true, deep: true },
    );

    watch(
      () => props,
      () => {
        tippy.setProps(getOptions());

        if (slots.content) tippy.setContent(() => contentElem.value);
      },
      { deep: true },
    );

    return {
      elem,
      contentElem,
      mounted,
      ...tippy,
    };
  },
  render() {
    const slots = isVue2 ? this.$scopedSlots : this.$slots;
    const expose = {
      elem: this.elem,
      contentElem: this.contentElem,
      mounted: this.mounted,
      ...this.tippy,
    };
    const slot = slots.default ? slots.default(expose) : [];
    return h(
      this.tag as string,
      { ref: 'elem', 'data-v-tippy': '' },
      slots.content
        ? [
            slot,
            h(
              this.contentTag as string,
              {
                ref: this.contentElem,
                style: { display: this.mounted ? 'inherit' : 'none' },
                class: this.contentClass,
              },
              slots.content(expose),
            ),
          ]
        : slot,
    );
  },
});

export default TippyComponent;
