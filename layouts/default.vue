<template>
  <div>
    <NavBar />
    <div class="container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default {
  name: "Default",
  components: { NavBar, Footer }
}
</script>

<style lang="scss">
@media only screen and (max-width: 1024px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>

