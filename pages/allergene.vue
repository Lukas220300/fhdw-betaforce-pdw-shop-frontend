<template>
  <div>
    <h1 class="title is-1">Allergene</h1>
    <div class="block">
      Unsere Kunden und ihre Gesundheit liegen uns am Herzen. Deswegen finden sie auf dieser Seite eine Auflistung der
      14 Hauptallergengruppen.
    </div>
    <div class="c-AllergensList">
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">A</span>Mit Konservierungsstoff</h5>
        <!-- <h5 class="subtitle is-5">Alle Eisorten</h5> -->
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">B</span>Mit Farbstoff</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">C</span>Mit Antioxidationsmittel</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">D</span>Mit Geschmacksverstärker</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">E</span>Mit Phosphat</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">F</span>Mit Süßungsmittel</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">G</span>Enthält eine Penylalaninquelle</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">H</span>Geschwefelt</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">I</span>Geschwärzt</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">J</span>Koffeinhaltig</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">K</span>Chininhaltig</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">L</span>Gewachst</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">M</span>Beinhaltet Gluten</h5>
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










