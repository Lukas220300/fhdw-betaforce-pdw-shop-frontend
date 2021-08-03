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
            <button class="button is-light" @click="open = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            <nuxt-link to="/auth/login" class="button is-primary">
              <strong>Login</strong>
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section>
     <b-sidebar
      type="is-light"
      :fullheight="true"
      :overlay="true"
      :right="true"
      v-model="open"
      mobile="fullwidth"
    >
      <div class="p-5">
        <b-field grouped label="Wonach möchten Sie suchen?">
            <div class="control has-icons-left is-expanded is-clearfix">
              <input type="search" autocomplete="on" placeholder="Suchen..." class="input" v-model="searchTerm" v-bind:class="{'is-danger': validationData == 2}">
              <span class="icon is-left">
                <i class="mdi mdi-magnify mdi-24px"></i>
              </span>
            </div>
            <p class="control">
                <b-button type="is-primary" label="Suchen" @click="search"/>
            </p>
        </b-field>
      </div>
     </b-sidebar>
  </section>
  </div>
</template>

<script>
import Icon from "./Icon";
import {ref} from "@nuxtjs/composition-api";
import {
  validateDefaultText
} from "./../scripts/inputValidation/inputValidation"
export default {
  name: "NavBar",
  components: {Icon},
  setup() {
    const open = ref(false)
    const searchTerm = ref('')
    const validationData = ref(0)

    return {
      open,
      searchTerm,
      validationData
    }
  },
  methods: {
    search() {
      if (!validateDefaultText(this.searchTerm)) {
        this.validationData = 2
        return
      }
      
      this.validationData = 1
      this.open = false
      this.$router.push('/search?searchTerm=' + this.searchTerm)
    }
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

@media only screen and (min-width: 769px) {
  .b-sidebar .sidebar-content {
    width: 55%;
  }
}

@media only screen and (min-width: 1023px) {
  .b-sidebar .sidebar-content {
    width: 40%;
  }
}
</style>
