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

