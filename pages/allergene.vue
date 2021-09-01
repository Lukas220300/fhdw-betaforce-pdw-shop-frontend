<template>
  <div>
    <h1 class="title is-1">Allergene</h1>
    <div class="block">
      Unsere Kunden und ihre Gesundheit liegen uns am Herzen. Deswegen finden sie auf dieser Seite eine Auflistung der
      13 Hauptallergengruppen.
    </div>
    <div class="c-AllergensList">
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">1</span>Mit Konservierungsstoff</h5>
        <!-- <h5 class="subtitle is-5">Alle Eisorten</h5> -->
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">2</span>Mit Farbstoff</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">3</span>Mit Antioxidationsmittel</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">4</span>Mit Geschmacksverstärker</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">5</span>Mit Phosphat</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">6</span>Mit Süßungsmittel</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">7</span>Enthält eine Penylalaninquelle</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">8</span>Geschwefelt</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">9</span>Geschwärzt</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">10</span>Koffeinhaltig</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">11</span>Chininhaltig</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">12</span>Gewachst</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">13</span>Beinhaltet Gluten</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Allergene",
}
</script>

<style lang="scss">
.c-AllergenListItem {
  padding: 1rem;

  &__index {
    margin-right: 1rem;
  }

  .subtitle.is-5 {
    margin-left: 1.7rem;
  }

}
</style>










