<template>
  <div class="card">
    <div v-if="imageLink" class="card-image">
      <figure class="image is-4by3">
        <img :src="imageLink" :alt="imageAlt">
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
      default: () => {
        return {path: '/'}
      }
    },
    imageLink: {
      type: String,
      default: undefined,
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

