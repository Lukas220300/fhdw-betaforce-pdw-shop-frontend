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
  name: "default",
  components: { NavBar, Footer }
}
</script>

