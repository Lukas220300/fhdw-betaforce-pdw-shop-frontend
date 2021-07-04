<template>
  <div>
    <b-carousel>
      <b-carousel-item v-for="(carousel, i) in slides" :key="i">
        <section :class="`hero is-medium is-${carousel.color}`">
          <div class="hero-body has-text-centered">
            <h1 class="title">{{carousel.text}}</h1>
          </div>
        </section>
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

