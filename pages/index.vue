<template>
  <div>
    <StageSlider :slides="slides" />
    <h2 class="title is-2">Kategorien</h2>
    <div>
      <Teaser v-for="category in categories" :key="category.id" :title="category.title" :image-link="category.cover" :internal-image="true" />
    </div>
    <h2 class="title is-2">Login</h2>
    <div>
      <nuxt-link to="/auth/login" class="button is-info is-rounded is-large">Hier gehts zum Login</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, useContext} from "@nuxtjs/composition-api";
import StageSlider from "@/components/StageSlider.vue";
import Teaser from "@/components/Teaser.vue";
import {Category} from "~/composable/api/interfaces/category";
import { useApi } from "~/composable/api";

export default defineComponent({
  components: { StageSlider, Teaser },
  setup() {
    // definitions
    const { $axios } = useContext()
    const categories = ref<Category[]>()

    // api fetches
    useApi($axios).category.findAll().then((categoryArray) => {
      categories.value = categoryArray
      console.log(categoryArray)
    }).catch((error) => {
      console.log(error)
    })

    // other
    const slides = [
      {imageName: 'sample/sample-3.jpg', link: '/'},
      {imageName: 'sample/sample-2.jpg', link: '/'},
      {imageName: 'sample/sample-1.jpg', link: '/'},
    ]

    return {
      slides,
      categories,
    }
  }
})

</script>
