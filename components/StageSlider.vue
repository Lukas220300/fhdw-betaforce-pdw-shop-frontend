<template>
  <div>
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in slides" :key="i">
        <nuxt-link v-if="carousel.link" :to="carousel.link">
          <div class="image-container">
            <img v-if="carousel.imageName" :src="require('~/assets/img/' + carousel.imageName)">
            <img v-else-if="carousel.imageWithLink" :src="carousel.imageWithLink">
          </div>
        </nuxt-link>
        <div v-else class="image-container">
          <img v-if="carousel.imageName" :src="require('~/assets/img/' + carousel.imageName)">
          <img v-else-if="carousel.imageWithLink" :src="carousel.imageWithLink">
        </div>
      </b-carousel-item>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "StageSlider",
  props: {
    slides: {
      type: Array,
      required: true,
    }
  },
  setup() {
    return {
    }
  },
}
</script>

<style lang="scss">
.carousel-items {
  max-height: 40rem;

  img {
    object-fit: cover;
  }

}
</style>
