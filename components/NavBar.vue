<template>
  <div>
    <b-navbar class="c-navbar container">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }" class="c-navbar__logo" >
          <Icon name="logo-only-icon" />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Startseite
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/categories' }">
          Produkte
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/ueber-uns' }">
          Über uns
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <search-field />
            <nuxt-link to="/auth/login" class="button is-primary">
              <strong>Login</strong>
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import Icon from "./Icon";
import SearchField from "./SearchField.vue";
export default {
  name: "NavBar",
  components: {
    Icon,
    SearchField
  }
}
</script>

<style lang="scss">
.c-navbar {
  &__logo {
    > svg {
      width: 3.5rem !important;
      height: 3.5rem !important;
    }
  }
}
@media only screen and (max-width: 1023px) {
  .c-navbar {
    &__logo {
      > svg {
        width: 1.5rem !important;
        height: 1.5rem !important;
      }
    }
  }
}
</style>
