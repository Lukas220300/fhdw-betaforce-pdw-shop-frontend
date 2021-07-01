<template>
  <div>
    {{ foo }}
    <Tutorial/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    return {
      foo: 'foo',
    }
  }
})

</script>
