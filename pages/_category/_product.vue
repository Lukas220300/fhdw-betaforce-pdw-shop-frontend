<template>
  <div class="c-productDetail columns">
    <div class="column is-4">
      <b-skeleton v-if="loading" height="35rem"></b-skeleton>
    </div>
    <div class="column is-8">
      <div class="c-productDetail__skeleton">
        <b-skeleton v-if="loading" height="4rem"></b-skeleton>
      </div>
      <div class="c-productDetail__skeleton">
        <b-skeleton v-if="loading" height="30rem"></b-skeleton>
      </div>
      <div>
        <b-skeleton v-if="loading" height="4rem"></b-skeleton>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "@nuxtjs/composition-api";

export default {
  name: "ProductDetail",
  setup() {
    const loading = ref(true);

    return {
      loading
    }
  },
}
</script>

<style lang="scss">
.c-productDetail {
  margin-top: 1rem;

  &__skeleton {
    margin-bottom: 1rem;
  }
}
</style>
