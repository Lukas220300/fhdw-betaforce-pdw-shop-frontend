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
import {ref, useContext, useRouter} from "@nuxtjs/composition-api";

export default {
  name: "ProductDetail",
  setup() {
    const { params } = useContext()
    const categoryTitle = params.value.category
    const productId = params.value.product
    const loading = ref(true);

    if(!productId) {
      if(!categoryTitle) {
        useRouter().push('/')
      } else {
        useRouter().push('/categories/' + categoryTitle)
      }
    }


    return {
      loading,
      categoryTitle,
      productId,
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
