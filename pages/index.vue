<template>
  <div>
    <StageSlider :slides="slides" />
    <h2 class="title is-2">Login</h2>
    <div>
      <nuxt-link to="/auth/login" class="button is-info is-rounded is-large">Hier gehts zum Login</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import StageSlider from "@/components/StageSlider.vue";

export default defineComponent({
  components: { StageSlider },
  setup() {


    const slides = [
      {imageName: 'sample/sample-3.jpg', link: '/'},
      {imageName: 'sample/sample-2.jpg', link: '/'},
      {imageName: 'sample/sample-1.jpg', link: '/'},
    ]

    return {
      slides,
    }
  }
})

</script>
