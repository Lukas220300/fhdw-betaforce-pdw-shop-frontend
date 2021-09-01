<template>
  <div class="c-shoppingCart">
    <h1 class="title is-1">Einkaufswagen</h1>
    <div v-if="entries.length" class="c-shoppingCart__tableContainer">
      <table class="table is-striped">
          <thead>
          <tr>
            <th>Nr.</th>
            <th>Bezeichnung</th>
            <th>Einheit</th>
            <th>Stückpreis</th>
            <th>Menge</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(entry, index) in entries" :key="index">
            <th>{{ index+1 }}</th>
            <th>{{ entry.product.name }}</th>
            <td>{{ entry.variant.unit.numberOfContainer }} X {{ entry.variant.unit.amount }}</td>
            <td style="text-align: right;">{{ entry.variant.price }} €</td>
            <td>
              <b-field>
                <b-field grouped>
                  <div class="b-numberinput field c-shoppingCart__addToCardInput is-grouped">
                    <p class="control minus">
                      <button type="button" @click="decrease(entry)" class="button is-primary">
                        <span class="icon">
                          <i class="mdi mdi-minus mdi-24px"></i>
                        </span>
                      </button>
                    </p>
                    <div class="control is-clearfix">
                      <input :id="'input-'+entry.product.id+'-'+entry.variant.id" type="number" :value="entry.amount" autocomplete="on" step="1" min="0" class="input">
                    </div>
                    <p class="control plus">
                      <button type="button" @click="increase(entry)" class="button is-primary">
                        <span class="icon">
                          <i class="mdi mdi-plus mdi-24px"></i>
                        </span>
                      </button>
                    </p>
                  </div>
                  <p class="control">
                    <button class="button c-addToCartButton" @click="removeEntry(entry)"><Icon name="trash"/></button>
                  </p>
                </b-field>
              </b-field>
            </td>
          </tr>
          </tbody>
        </table>
      <div class="c-shoppingCart__submitButton">
        <div class="tableContainerPrice">
          <table>
            <tr>
              <td class="td-one">Gesammtpreis</td>
              <td class="td-two">{{ totalPrice }} €</td>
            </tr>
            <tr>
              <td class="td-one">Versandkosten</td>
              <td class="td-two">3.00 €</td>
            </tr>
            <tr style="border-top: 1px solid black">
              <td class="td-one">Summe</td>
              <td class="td-two">{{ totalPrice + 3.00 }} €</td>
            </tr>
          </table>
        </div>
        <nuxt-link v-if="$auth.loggedIn" to="/checkout" class="button is-success c-shoppingCart__submitButton">Zur Kasse</nuxt-link>
        <nuxt-link v-else :to="{path: '/auth/login', query: {redirectUri: '/checkout'}}" class="button is-success c-shoppingCart__submitButton">Zur Kasse</nuxt-link>
      </div>
    </div>
    <div v-else>
      <h2 class="title is-2"> Du hast noch keine Artikel in deinem Einkaufswagen.</h2>
      <nuxt-link to="/categories" class="button is-primary">Jetzt Kategorien entdecken</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Warenkorb",
  methods: {
    increase(entry) {
      const input = document.getElementById('input-'+entry.product.id+'-'+entry.variant.id)
      this.$store.commit('shoppingCart/increaseEntry', entry)
      input.value++
    },
    decrease(entry) {
      const input = document.getElementById('input-'+entry.product.id+'-'+entry.variant.id)
      this.$store.commit('shoppingCart/decreaseEntry', entry)
      input.value--
    },
    removeEntry(entry) {
      this.$store.commit('shoppingCart/removeEntry', entry)
    },
  },
  computed: {
    entries(){
      return this.$store.state.shoppingCart.entries
    },
    totalPrice(){
      let totalPrice = 0
      this.$store.state.shoppingCart.entries.forEach((entry) => {
        const entryPrice = entry.amount * entry.variant.price
        totalPrice += entryPrice
      })
      return Math.round(totalPrice*100)/100
    }
  }
}
</script>

<style lang="scss">
.c-shoppingCart {
  .table {
    width: 100%;
  }
  &__tableContainer {
    overflow-x: scroll;
  }
  &__submitButton {
    float: right;
  }
  &__priceSummary {
    float: right;
  }
  .c-shoppingCartEntry {
    &__item {
      display: inline-block;
    }
    &__image {
      width: 2rem;
    }
  }
  .td-one {
    padding-right: 1rem;
  }
  .td-two {
    float: right;
  }
  .tableContainerPrice {
    margin-bottom: 1rem;
  }
  .c-addToCartButton {
    & > svg {
      width: 1rem;
      height: 1rem;
    }
  }
  &__addToCardInput {
    & input {
      width: 2.5rem;
    }
  }
  .c-VariantTable {
    &__container {
      overflow-x: scroll;
    }
  }
}
</style>
