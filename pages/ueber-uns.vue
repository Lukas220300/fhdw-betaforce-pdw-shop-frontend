<template>
  <div class="c-ueberUns">
    <h1 class="title is-1">Über Uns</h1>

    <h3 class="title is-3">Wir sind <h2 class="title is-2" style="display: inline-block">SIP.shop,</h2></h3>

    <h5 class="subtitle is-4">euer kompetenter Partner rund um das Thema Getränke.</h5>

    <div>
      <Icon name="logo"/>
    </div>

    <p class="block">Unser Slogan „<strong>Stay hydrated</strong>“ ist nicht nur ein Spruch, sondern das zentrale
      Element in unserem jungen Unternehmen.</p>

    <p class="block">Wir möchten allen Bewohnern im Kreis Ostwestfalen die Möglichkeit bieten, die Getränke, die ihr
      euch so sehnlichst
      wünscht bequem im Internet zu bestellen. Unsere Bestimmung ist es, euch Getränke überall wo ihr wollt
      hinzuliefern.
      Egal ob an einen Badesee, eine Firma oder bei einer Party bei euch zuhause.</p>

    <div class="block">
      <p>Das klingt zu schön um Wahr Zusein?</p>

      <p><strong>Ja, das stimmt.</strong></p>
    </div>

    <p class="block">Aber das Beste ist, dass die Getränkebestellung so einfach ist, dass sie jeder tätigen kann. Einmal
      in unserem Shop
      angemeldet, so könnt ihr bequem über eure hinterlegten Daten Getränke bestellen. Egal ob Bier, Spirituosen,
      Softdrinks oder für den exquisiteren Gaumen Champagner. Wir haben verschiedene Sorten jedes Produktes für Euch in
      unserem Sortiment.</p>

    <p>Meldet euch an und „stay hydrated“ mit der Getränkelieferung von <strong>SIP.shop !</strong></p>

    <div style="margin: 2rem">
      <nuxt-link to="/auth/login" class="button is-primary is-fullwidth">Jetzt Los SHOPPEN!</nuxt-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "UeberUns"
}
</script>

