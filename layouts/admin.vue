<template>
  <div class="container">


    <nav class="navbar c-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item c-navbar__logo" to="/">
          <Icon name="logo-only-icon"/>
        </nuxt-link>

        <a role="button" class="navbar-burger" @click="toggleMenu()" v-bind:class="{'is-active':menuOpen}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': menuOpen}">
        <div class="navbar-start">
          <nuxt-link to="/admin" class="navbar-item">
            Home
          </nuxt-link>
          <nuxt-link to="/admin/order" class="navbar-item">
            Bestellungen
          </nuxt-link>
          <nuxt-link to="/admin/products" class="navbar-item">
            Produkte
          </nuxt-link>
          <nuxt-link to="/admin/categories" class="navbar-item">
            Kategorien
          </nuxt-link>
          <nuxt-link to="/admin/einheiten" class="navbar-item">
            Einheiten
          </nuxt-link>
          <nuxt-link v-if="isBackendAllowedUser($auth.user)" to="/admin/benutzer" class="navbar-item">
            Benutzerrechte
          </nuxt-link>
        </div>
      </div>
    </nav>



    <Nuxt />
  </div>
</template>

<script>
import {ref} from "@nuxtjs/composition-api";

export default {
  name: "Admin",
  // middleware: ['accessProtection', 'employee']
  middleware: ['employee'],
  setup(){
    const menuOpen = ref(false)
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const isBackendAllowedUser = (user) => {
      const roleToCheck = 'ROLE_ADMIN'
      if(!user.roles) {
        location.reload()
      } else {
        let hasRights = false
        user.roles.forEach((role) => {
          if (role.name === roleToCheck) {
            hasRights = true
          }
        })
        return hasRights
      }
      return false
    }

    return {
      menuOpen,
      toggleMenu,
      isBackendAllowedUser,
    }
  },
}
</script>

<style lang="scss">
.container {
  margin-bottom: 3rem;
}
</style>
