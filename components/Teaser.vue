<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
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
      default: () => {return { path: '/' }}

    }
  }
}
</script>

<style lang="scss">
.card {
  max-width: 15rem;
}
</style>

