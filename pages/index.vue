<template>
  <div>
    <StageSlider :slides="slides" />
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
