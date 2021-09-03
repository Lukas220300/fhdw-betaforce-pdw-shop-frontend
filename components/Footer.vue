<template>
  <footer class="c-Footer footer columns">
    <div class="column">
      <div class="c-Footer__headline">Unternehmen</div>
      <div class="c-Footer__linkList">
        <nuxt-link to="/ueber-uns">Über Uns</nuxt-link>
      </div>
    </div>
    <div class="column">
      <div class="c-Footer__headline">Service</div>
      <div class="c-Footer__linkList">
        <nuxt-link to="/contact">Kontakt</nuxt-link>
        <nuxt-link to="/faq">FAQ</nuxt-link>
        <nuxt-link to="/allergene">Allergene</nuxt-link>
      </div>
    </div>
    <div class="column">
      <div class="c-Footer__headline">Rechtliches</div>
      <div class="c-Footer__linkList">
        <nuxt-link to="/agb">AGB</nuxt-link>
        <nuxt-link to="/datenschutz">Datenschutzbestimmung</nuxt-link>
        <nuxt-link to="/impressum">Impressum</nuxt-link>
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
footer.c-Footer.footer.columns {
  margin: 0;
}
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

