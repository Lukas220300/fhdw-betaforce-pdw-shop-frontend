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
        answer: 'Sie haben verschiedene Zahlmöglichkeiten bei uns. Sie können bequem via PayPal, Apple-Pay und Kreditkarte zahlen.'
      },
      {
        question: 'Wie alt muss ich sein, um eine Bestellung aufzugeben?',
        answer: 'Sie müssen mindestens 16 Jahre alt sein.'
      },
      {
        question: 'Wie groß ist ihr Lieferradius?',
        answer: 'Wir beliefern im Umkreis von 20km um Bielefeld herum.'
      },
      {
        question: 'Ist die Lieferung kostenlos?',
        answer: 'Die Lieferung im Stadtkreis Bielefeld ist kostenlos, außerhalb fällt eine Gebühr von ca. 3 € an.'
      },
      {
        question: 'Sind die Getränke bei der Lieferung gekühlt?',
        answer: 'Die Getränke stehen in klimatisierten Lagerhallen, sodass die Getränke bei kurzen Fahrten in unseren Lieferwagen nicht warm werden.'
      },
      {
        question: 'Wie lange dauert durchschnittlich eine Getränkelieferung?',
        answer: 'Wir bemühen uns die Getränke innerhalb von 1-1,5 Std. zuzustellen. Jedoch können wir bei hohem Bestellaufkommen in den Stoßzeiten diese Lieferzeit nicht gewährleisten.'
      },
      {
        question: 'Gibt es einen Mindestbestellwert?',
        answer: 'Der Mindestbestellwert bei uns beträgt 20€.'
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
