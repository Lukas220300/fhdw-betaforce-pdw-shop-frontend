<template>
  <svg>
    <use v-bind="{
      'xlink:href': require('~/assets/svg/icons.svg') + '#' + name,
    }" />
  </svg>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: "Icon",
  props: {
    name: {
      type: String,
      require: true,
      default: undefined,
    }
  }
})
</script>

<style scoped>
svg {
  fill: currentColor;
  height: auto;
  width: 100%;
}
</style>
