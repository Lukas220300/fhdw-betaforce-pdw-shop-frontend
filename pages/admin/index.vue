<template>
  <div class="c-admin-dashboard">
    <h1 class="title is-1">SIP-Dashboard</h1>
    <div>

      <div class="card">
        <div class="card-content">
          <p class="title indexNumber">
            {{ notDeliveredOrders }}
          </p>
          <p class="subtitle">
            Offene Bestellungen
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <p class="title indexNumber">
            {{ totalUser }}
          </p>
          <p class="subtitle">
            Benutzer
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <p class="title indexNumber">
            {{ totalOrder }}
          </p>
          <p class="subtitle">
            Gesamt Bestellungen
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <p class="title indexNumber">
            {{ totalProducts }}
          </p>
          <p class="subtitle">
            Produkte
          </p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

const {useApi} = require("@/composable/api");
export default {
  name: "Index",
  layout: 'admin',
  setup() {
    const {$axios} = useContext()

    const totalUser = ref(0)
    const totalProducts = ref(0)
    const totalOrder = ref(0)
    const notDeliveredOrders = ref(0)

    useApi($axios).user.findAll().then((response) => {
      totalUser.value = response.page.totalElements
    })

    useApi($axios).product.findAll().then((response) => {
      totalProducts.value = response.page.totalElements
    })

    useApi($axios).order.findAll().then((response) => {
      totalOrder.value = response.page.totalElements
      let notDelivered = 0
      for (const orderIndex in response._embedded.orders) {
        if (response._embedded.orders[orderIndex].status !== 'DELIVERED') {
          notDelivered = notDelivered + 1
        }
      }
      notDeliveredOrders.value = notDelivered
    })


    return {
      totalUser,
      totalProducts,
      totalOrder,
      notDeliveredOrders,
    }
  },
}
</script>

<style lang="scss">
.c-admin-dashboard {
  .card {
    width: 15rem;
    display: inline-block;
    margin: 1rem;

    .indexNumber {
      font-size: 7rem;
      text-align: center;
    }

    .subtitle {
      text-align: center;
    }
  }
}
</style>

