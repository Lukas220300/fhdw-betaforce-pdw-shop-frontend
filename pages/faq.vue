<template>
  <div class="c-Faq">
    <h1 class="title is-1">FAQ</h1>

    <b-collapse
      v-for="(collapse, index) of collapses"
      :key="index"
      :open="isOpen == index"
      class="card"
      animation="slide"
    >
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
        >
          <p class="card-header-title">
            {{ collapse.question }}
          </p>
          <a class="card-header-icon">
            <b-icon
              :icon="props.open ? 'menu-up' : 'menu-down'">
            </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div class="content">
          {{ collapse.answer }}
        </div>
      </div>
    </b-collapse>


  </div>
</template>

<script>
export default {
  name: "Faq",
  setup() {
    const collapses = [
      {
        question: 'Welche Zahlmöglichkeiten gibt es?',
        answer: 'Derzeit sind Ihre Optionen noch sehr begrenzt, aber wir arbeiten dran! Aktuell können Sie nur mit Kreditkarte Zahlen.'
      },
      {
        question: 'Gibt es bei euch Altersbeschränkungen?',
        answer: 'Wir halten uns selbstverständlich an alle Gesetzesvorgaben in Deutschland!'
      },
      {
        question: 'Wie groß ist ihr Lieferradius?',
        answer: 'Wir beliefern im Umkreis von 40km um Bielefeld herum.'
      },
      {
        question: 'Ist die Lieferung kostenlos?',
        answer: 'Bei der Lieferung fällt eine Gebühr von ca. 3 € an.'
      },
      {
        question: 'Sind die Getränke bei der Lieferung gekühlt?',
        answer: 'Die Getränke stehen in klimatisierten Lagerhallen, sodass die Getränke bei kurzen Fahrten in unseren Lieferwagen nicht warm werden.'
      },
      {
        question: 'Wie lange dauert durchschnittlich eine Getränkelieferung?',
        answer: 'Es kommt drauf an, wo Sie wohnen. Wir bemühen uns um eine schnellstmögliche Zustellung.'
      },
      {
        question: 'Gibt es einen Mindestbestellwert?',
        answer: 'Sowas gibt es bei uns nicht - Wir liefern einfach alles!'
      },
    ]

    return {
      collapses,
      isOpen: -1,
    }
  }
}
</script>

<style lang="scss">
.c-Faq {
  .card {
    margin-bottom: 1rem;
  }
}
</style>
