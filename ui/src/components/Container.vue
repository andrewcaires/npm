<template>
  <div class="ui-container" :class="_class">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";

import { useSizes } from "../utils";

const props = defineProps({
  fluid: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  medium: { type: Boolean, default: false },
  large: { type: Boolean, default: false },
  extra: { type: Boolean, default: false },
});

const { fluid } = toRefs(props);

const sizes = useSizes(props, "ui-container");

const _class = computed(() => {
  return { "ui-container--fluid": fluid.value, ...(fluid.value ? {} : sizes.value) };
});
</script>

<style lang="scss">
.ui-container {
  margin-right: auto;
  margin-left: auto;
  width: 100%;

  @include sm {
    width: 540px;

    .ui-container--small {
      width: 100%;
    }
  }

  @include md {
    width: 720px;

    .ui-container--medium {
      width: 100%;
    }
  }

  @include lg {
    width: 960px;

    .ui-container--large {
      width: 100%;
    }
  }

  @include xl {
    width: 1140px;

    .ui-container--extra {
      width: 100%;
    }
  }

  &.ui-container--fluid {
    width: 100%;
  }
}
</style>
