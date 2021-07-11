<template>
  <div>
    <h1 class="title is-1">Allergene</h1>
    <div class="block">
      Unsere Kunden und ihre Gesundheit liegen uns am Herzen. Deswegen finden sie auf dieser Seite eine Auflistung der
      14 Hauptallergengruppen.
    </div>
    <div class="c-AllergensList">
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">A</span>Eier/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">Alle Eisorten</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">B</span>Erdnüsse/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">Alle Erdnusssorten</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">C</span>Fisch/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">Alle Firscharten ( u.a. Anchovis, Kaviar)</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">D</span>Glutenhaltiges Getreide/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. Weizen, Hartweizen, Roggen, Gerste, Hafer</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">E</span>Krebstiere/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. Krebs, Schrimps, Garnelen, Scampi, Hummer</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">F</span>Lupine/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. Lupinenmehl, Lupinenkonzentrat, Lupinenprotein</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">G</span>Milch/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">Alle Milchprodukte</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">H</span>Schalenfrüchte (Nüsse) /-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. Mandeln, Haselnüsse, Walnüsse, Pistazien, Cashewkerne</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">I</span>Schwefeldioxid/Sulfite</h5>
        <h5 class="subtitle is-5">E220 – E228 u.a. in Trockenobst, Tomatenpüree, Wein</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">J</span>Sellerie/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">Bleichsellerie, Knollensellerie, Staudensellerie</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">K</span>Senf/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. auch Senfsprossen, Senfpulver, Senfkörner</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">L</span>Sesam/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. Sesamöl, Sesammehl, Sesamsamen</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">M</span>Soja/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">Alle Sorten Sojabohnen</h5>
      </div>
      <div class="c-AllergenListItem">
        <h5 class="title is-5"><span class="c-AllergenListItem__index">N</span>Weichtiere/-Erzeugnisse</h5>
        <h5 class="subtitle is-5">u.a. Schnecken, Muscheln, Austern, Tintenfisch, Calamares</h5>
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
