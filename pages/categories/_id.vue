<template>
  <div>

    <div v-if="categoryId">
      Kategory detail page
    </div>
    <div v-else>
      Kategory overview
    </div>



  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

export default {
  name: "Id",
  setup() {
    const { params } = useContext()
    const categoryId = ref(params.value.id)

    return {
      categoryId,
    }
  }
}
</script>

