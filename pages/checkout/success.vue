<template>
  <div>
    <h1 class="title is-1">YEAH!!!</h1>
    <div class="block">Danke das du bei uns bestellt hast. Deine Bestllung wird bearbeitet. Du erhältst eine Nachricht,
      wenn sich deine Bestllung auf dem Weg zu dir macht.
    </div>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player src="/order-packed-lotti.json" background="transparent" speed="1"
                   style="width: 300px; height: 300px; margin: auto;" loop
                   autoplay></lottie-player>
    <nuxt-link to="/" class="button is-primary">Zur Startseite</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Success"
}
</script>

