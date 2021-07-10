<template>
  <footer class="c-Footer footer columns">
    <div class="column">
      <div class="c-Footer__headline">Unternehmen</div>
      <div class="c-Footer__linkList">
        <nuxt-link to="/">Über Uns</nuxt-link>
      </div>
    </div>
    <div class="column">
      <div class="c-Footer__headline">Service</div>
      <div class="c-Footer__linkList">
        <nuxt-link to="/">Kontakt</nuxt-link>
        <nuxt-link to="/">FAQ</nuxt-link>
        <nuxt-link to="/allergene">Allergene</nuxt-link>
      </div>
    </div>
    <div class="column">
      <div class="c-Footer__headline">Rechtliches</div>
      <div class="c-Footer__linkList">
        <nuxt-link to="/">AGB</nuxt-link>
        <nuxt-link to="/privacy">Datenschutzbestimmung</nuxt-link>
        <nuxt-link to="/">Impressum</nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss">
.c-Footer {
  padding-left: 3rem;
  padding-right: 3rem;
  margin-top: 1rem;

  &__headline {
    margin-bottom: 1rem;
    font-weight: bold;
  }
}
.c-Footer__linkList a {
  display: block;
}
</style>

