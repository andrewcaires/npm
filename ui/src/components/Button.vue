<template>
  <button class="ui-button" :class="_class" type="button">
    <ui-icon v-if="icon" :class="{ 'mr-2': $slots.default || label }" :name="icon" />
    <template v-else></template>
    <template v-if="label">{{ label }}</template>
    <slot v-else></slot>
    <ui-loading v-if="loading" :class="{ 'ml-2': $slots.default || label }" size="22" />
    <template v-else></template>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";

import { useSizes } from "../utils";

const props = defineProps({
  block: { type: Boolean, default: undefined },
  color: { type: String, default: "primary" },
  icon: { type: String, default: "" },
  loading: { type: Boolean, default: undefined },
  outline: { type: Boolean, default: false },
  label: { type: String, default: "" },
  small: { type: Boolean, default: undefined },
  medium: { type: Boolean, default: undefined },
  large: { type: Boolean, default: undefined },
  extra: { type: Boolean, default: undefined },
});

const { block, color: _color, outline } = toRefs(props);

const colors = ["primary", "secondary", "success", "info", "warning", "pending", "danger", "dark"];

const color = computed(() => colors.indexOf(_color.value) >= 0 ? _color.value : "primary");

const _sizes = useSizes(props, "ui-button");

const _class = computed(() => ({
  "ui-button--block": block?.value,
  ["ui-button--" + (outline.value ? "outline-" : "") + color.value]: true,
  ..._sizes.value,
}));
</script>

<style lang="scss">
.ui-button {
  @extend .no-select;
  align-items: center;
  @include rem("border-radius", 5);
  border-style: solid;
  @include rem("border-width", 1);
  cursor: pointer;
  display: flex;
  font-family: "Roboto";
  @include rem("font-size", 15);
  font-weight: normal;
  @include rem("height", 40);
  justify-content: center;
  @include rem("padding", 5, 18);
  transition: all 0.25s ease-out;

  &:active:not(:disabled) {
    position: relative;
    top: 1px;
  }

  &.ui-button--block {
    width: 100%;
  }

  &.ui-button--small {
    @include rem("font-size", 12);
    @include rem("height", 32);
    @include rem("padding", 2, 13);
  }

  &.ui-button--medium {
    @include rem("font-size", 15);
    @include rem("height", 40);
    @include rem("padding", 5, 18);
  }

  &.ui-button--large {
    @include rem("font-size", 17);
    @include rem("height", 45);
    @include rem("padding", 7, 21);
  }

  &.ui-button--extra {
    @include rem("font-size", 20);
    @include rem("height", 50);
    @include rem("padding", 10, 24);
  }

  $buttons-variants: "primary", "success", "info", "warning", "danger", "pending", "dark";

  @each $variant in $buttons-variants {

    $color: map-get($colors, $variant);

    &.ui-button--#{$variant} {
      background-color: $color;
      border-color: color($color, -5%);
      color: color($color-white, -5%);

      &:hover:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 25%);
      }

      &:focus:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 50%);
      }

      &:disabled {
        background-color: color($color, 25%);
        border-color: color($color, 20%);
        color: color($color-white, -10%);
      }
    }

    &.ui-button--outline-#{$variant} {
      border-color: $color;
      color: $color;

      &:hover:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 25%);
      }

      &:focus:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 50%);
      }

      &:disabled {
        border-color: color($color, 20%);
        color: color($color, 20%);
      }
    }
  }

  $buttons-variants: "secondary";

  @each $variant in $buttons-variants {

    $color: map-get($colors, $variant);

    &.ui-button--#{$variant} {
      background-color: $color;
      border-color: color($color, -5%);
      color: color($color-black, 5%);

      &:hover:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 25%);
      }

      &:focus:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 50%);
      }

      &:disabled {
        background-color: color($color, 5%);
        border-color: color($color, 5%);
        color: color($color-black, 10%);
      }
    }

    &.ui-button--outline-#{$variant} {
      border-color: color($color, -25%);
      color: color($color, -50%);

      &:hover:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 25%);
      }

      &:focus:not(:disabled) {
        box-shadow: 0 2px 5px 0 rgb($color, 50%);
      }

      &:disabled {
        border-color: color($color, -5%);
        color: color($color-white, -10%);
      }
    }
  }
}
</style>