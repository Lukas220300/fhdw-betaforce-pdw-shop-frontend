<template>
  <div class="c-myOrders">
    <h1 class="title is-1">Meine Bestellungen</h1>
    <div>
      <nuxt-link v-for="order in orders" :to="'/ich/bestellung/'+order.id" :key="order.id">
        <div class="card">
          <div class="card-image">
              <Icon name="order" />
          </div>
          <div class="card-content">
            <p class="title">
              Bestellung vom: <br>
              {{ formatToDate(order.createdAt) }}
            </p>
            <p class="subtitle">
              Bestellnummer: {{ order.id}}
            </p>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item" v-bind:class="{'card-footer-item__ordered': order.status === 'ORDERED','card-footer-item__payed': order.status === 'PAYED','card-footer-item__delivered': order.status === 'DELIVERED'}">
                {{order.status}}
            </p>
          </footer>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

const {useApi} = require("@/composable/api");
// @todo hier sind auch statusse
export default {
  name: "MeineBestellungen",
  setup() {
    const {$axios} = useContext()
    const orders = ref()

    useApi($axios).order.findByMe().then((response) => {
      orders.value = response
      orders.value.sort((a,b) => {
        return b.createdAt-a.createdAt
      })
    })

    const formatToDate = (timeStamp) => {
      const date = new Date(timeStamp)
      return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'numeric', day: 'numeric' })
    }

    return {
      orders,
      formatToDate,
    }
  },
}
</script>

<style lang="scss">
.c-myOrders {
  .card {
    width: 18rem;
    display: inline-block;
    margin: 1rem;
    .card-image {
      background-color: #7957d526;
      padding: 0.5rem;
    }
    .card-footer-item {
      &__ordered {
        background-color: #d2e0fb;
      }
      &__payed {
        background-color: #a7d6f9;
      }
      &__delivered {
        background-color: #91f5e6;
      }
      &__aboard {
        background-color: hsl(48, 100%, 96%);
      }
    }
  }
}
</style>
