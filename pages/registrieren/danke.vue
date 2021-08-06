<template>
  <div>
    <h1 class="title is-1">Danke</h1>
    <div class="block">Danke für dein Registrierung. Wir haben dir eine E-Mail mit einerm Bestätigungslink gesendet.
      Bitte bestätige deine Accounterstellung mit diesem Link.
    </div>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player src="/done-lotti.json" background="transparent" speed="1" style="width: 300px; height: 300px; margin: auto;" loop
                   autoplay></lottie-player>
    <nuxt-link to="/" class="button is-primary">Zurück zur Startseite</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Danke"
}
</script>

