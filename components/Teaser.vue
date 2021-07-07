<template>
  <div class="card">
    <div v-if="imageLink" class="card-image">
      <figure class="image is-4by3">
        <img v-if="internalImage" :src="require('~/assets/img/' + imageLink)" :alt="imageAlt">
        <img v-else :src="imageLink" :alt="imageAlt">
      </figure>
    </div>
    <div class="card-content">
      <div class="title">
        {{ title }}
      </div>
      <div class="subtitle">
        {{ subTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Teaser",
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    subTitle: {
      type: String,
      default: '',
      required: false
    },
    route: {
      type: Object,
      required: false
    },
    imageLink: {
      type: String,
      default: undefined,
    },
    internalImage: {
      type: Boolean,
      required: false,
      default: false,
    },
    imageAlt: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss">
.card {
  max-width: 15rem;
  width: 15rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  display: inline-block;

  .card-footer-item {
    border-radius: 0;
  }
}

</style>

