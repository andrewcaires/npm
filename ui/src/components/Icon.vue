<template>
  <i class="ui-icon">{{ name }}</i>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  name: { type: String, required: true },
});

const { name } = toRefs(props);
</script>

<style lang="scss">
.ui-icon {
  font-family: 'Material';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
</style>
