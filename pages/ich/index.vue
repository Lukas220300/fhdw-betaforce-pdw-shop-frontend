<template>
  <div class="c-Ich">
    <div class="c-dear">
      <h1 class="title is-1">Hallo {{$auth.user.firstName}} {{$auth.user.lastName}},</h1>
      <h3 class="subtitle is-3">Wie können wir dir weiterhelfen?</h3>
    </div>
    <div class="c-options">
      <nuxt-link to="/ich/meine-bestellungen" class="button is-fullwidth is-primary is-light">Meine Bestellungen</nuxt-link>
      <nuxt-link to="/ich/meine-daten" class="button is-fullwidth is-primary is-light">Meine Daten</nuxt-link>
      <nuxt-link to="/admin" v-if="true" class="button is-fullwidth is-info is-light">Shop Backend</nuxt-link>
      <hr />
      <button @click="$auth.logout()" class="button is-danger is-fullwidth">Logout</button>
    </div>

  </div>
</template>

<script>
// @todo validierung für admin bereich
export default {
  name: "Index",
  middleware: ['loggedIn'],
}
</script>

<style lang="scss">
.c-Ich {
  .card {
    max-width: 20rem;
    padding: 0.5rem;
    margin: 1rem;
  }
  .icon {
    > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .c-dear {
    margin-bottom: 2rem;
    .is-1 {
      margin-bottom: 0.5rem;
    }
  }
  .c-options {
    .button {
      margin-bottom: 1rem;
    }
  }
}
</style>
