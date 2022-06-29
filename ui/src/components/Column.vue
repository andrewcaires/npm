<template>
  <div class="ui-column" :class="cols">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { columns } from "../utils";

const props = defineProps({
  cols: { type: String, default: "24" },
  sm: { type: String, default: undefined },
  md: { type: String, default: undefined },
  lg: { type: String, default: undefined },
  xl: { type: String, default: undefined },
});

const cols = columns(props);
</script>

<style lang="scss">
.ui-column {
  display: flex;
  width: 100%;
}
</style>
