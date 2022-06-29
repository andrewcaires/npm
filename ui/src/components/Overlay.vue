<template>
  <template v-if="display">
    <div class="ui-overlay">
      <svg xmlns="http://www.w3.org/2000/svg" :height="size" :width="size" viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid">
        <g transform="translate(20 50)">
          <circle cx="0" cy="0" r="6" :fill="color">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" :dur="duration"
              repeatCount="indefinite">
            </animateTransform>
            <animate attributeName="fill-opacity" keyTimes="0;0.5;1" :dur="duration" repeatCount="indefinite"
              values="0;1;0" begin="-0.375s" />
          </circle>
        </g>
        <g transform="translate(40 50)">
          <circle cx="0" cy="0" r="6" :fill="color">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" :dur="duration"
              repeatCount="indefinite">
            </animateTransform>
            <animate attributeName="fill-opacity" keyTimes="0;0.5;1" :dur="duration" repeatCount="indefinite"
              values="0;1;0" begin="-0.25s" />
          </circle>
        </g>
        <g transform="translate(60 50)">
          <circle cx="0" cy="0" r="6" :fill="color">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" :dur="duration"
              repeatCount="indefinite">
            </animateTransform>
            <animate attributeName="fill-opacity" keyTimes="0;0.5;1" :dur="duration" repeatCount="indefinite"
              values="0;1;0" begin="-0.125s" />
          </circle>
        </g>
        <g transform="translate(80 50)">
          <circle cx="0" cy="0" r="6" :fill="color">
            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" :dur="duration"
              repeatCount="indefinite">
            </animateTransform>
            <animate attributeName="fill-opacity" keyTimes="0;0.5;1" :dur="duration" repeatCount="indefinite"
              values="0;1;0" begin="0s" />
          </circle>
        </g>
      </svg>
    </div>
  </template>
  <template v-else></template>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";

import { useSize, useStoreGetters, useStoreRegister } from "../utils";

import overlay from "../stores/overlay";

useStoreRegister("overlay", overlay);

const display = useStoreGetters("overlay/display");

const props = defineProps({
  color: { type: String, default: "#FFFFFF" },
  duration: { type: String, default: "1.25s" },
  size: { type: String, default: "250px" },
});

const { color: _color } = toRefs(props);

const color = computed(() => _color?.value || "currentColor");

const size = useSize(props);
</script>

<style lang="scss">
.ui-overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 1000;
}
</style>
