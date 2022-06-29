import { isNumber, TypeObject } from "@andrewcaires/utils.js";
import { computed, ComputedRef, onMounted, onUnmounted, ref, toRefs } from "vue";
import { Module, useStore } from "vuex";

type TypeObjectProps = TypeObject<any>;

export const columns = (props: TypeObjectProps) => {
  const { cols, sm, md, lg, xl } = toRefs(props);
  return computed(() => {
    return {
      ["sm:c-" + sm.value]: sm && sm.value,
      ["md:c-" + md.value]: md && md.value,
      ["lg:c-" + lg.value]: lg && lg.value,
      ["xl:c-" + xl.value]: xl && xl.value,
      ["c-" + cols.value]: cols && cols.value,
    };
  });
}

const sizes = ["px", "%", "cm", "mm", "in", "pt", "pc", "en", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax"];

const sizeConverter = (size: string): string => {
  return sizes.find((value) => {
    return size.length == size.indexOf(value) + value.length;
  }) ? size : parseInt(size) + "px";
}

export const useEventListener = (target: any, event: string, callback: Function): void => {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}

export const useSize = (props: TypeObjectProps): ComputedRef => {
  const { size } = toRefs(props);
  return computed(() => isNumber(size.value) ? size.value + "px" : sizeConverter(size.value));
}

export const useSizeHeight = (props: TypeObjectProps): ComputedRef => {
  const { height } = toRefs(props);
  return computed(() => isNumber(height.value) ? height.value + "px" : sizeConverter(height.value));
}

export const useSizeWidth = (props: TypeObjectProps): ComputedRef => {
  const { width } = toRefs(props);
  return computed(() => isNumber(width.value) ? width.value + "px" : sizeConverter(width.value));
}

export const useSizes = (props: TypeObjectProps, key: string = ""): ComputedRef => {
  key = key != "" ? key + "--" : "";
  const { small, medium, large, extra } = toRefs(props);
  return computed(() => {
    return {
      [key + "small"]: small && small.value,
      [key + "medium"]: medium && medium.value,
      [key + "large"]: large && large.value,
      [key + "extra"]: extra && extra.value,
    };
  });
}

export const useMouse = () => {
  const x = ref(0);
  const y = ref(0);
  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });
  return { x, y };
}

export const useStoreGetters = (getter: string): ComputedRef => {
  const store = useStore();
  return computed(() => store.getters[getter]);
}

export const useStoreRegister = (name: string, module: Module<any, any>): void => {
  const store = useStore();
  if (!store.hasModule(name)) {
    store.registerModule(name, module);
  }
}
