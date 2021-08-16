<template>
  <div class="container">


    <nav class="navbar c-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item c-navbar__logo" to="/">
          <Icon name="logo-only-icon"/>
        </nuxt-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/admin" class="navbar-item">
            Home
          </nuxt-link>

          <nuxt-link to="/admin/products" class="navbar-item">
            Produkte
          </nuxt-link>
          <nuxt-link to="/admin/categories" class="navbar-item">
            Kategorien
          </nuxt-link>


        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>



    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "Admin",
  // middleware: ['accessProtection', 'admin']
  middleware: ['admin']
}
</script>

