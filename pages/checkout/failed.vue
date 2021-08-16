<template>
  <div>
    <h1 class="title is-1">UPS..</h1>
    <div class="block"> Etwas ist bei deiner Bestellung schief gelaufen. Bitte probiere es nochmal.
    </div>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player src="/failed-lotti.json" background="transparent" speed="1" style="width: 300px; height: 300px; margin: auto;" loop
                   autoplay></lottie-player>
    <nuxt-link to="/warenkorb" class="button is-primary">Zum Warenkorb</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Failed"
}
</script>

