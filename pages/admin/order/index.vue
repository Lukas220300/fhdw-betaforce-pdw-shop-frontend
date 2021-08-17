<template>
  <div class="c-orders">
    <h1 class="title is-1">Bestellungen</h1>

    <div class="control">
      <label class="checkbox">
        <input type="checkbox" v-model="showId">
        Ids
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="showUser">
        Empfänger
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="showStatus">
        Status
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="showCreatedAt">
        Bestelldatum
      </label>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
        <tr>
          <th v-if="showId"><abbr title="Bestellnummer">Id</abbr></th>
          <th v-if="showUser">Empfänger</th>
          <th v-if="showStatus">Status</th>
          <th v-if="showCreatedAt">Bestelldatum</th>
          <th>Infos</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
          <th v-if="showId"><abbr title="Bestellnummer">Id</abbr></th>
          <th v-if="showUser">Empfänger</th>
          <th v-if="showStatus">Status</th>
          <th v-if="showCreatedAt">Bestelldatum</th>
          <th>Infos</th>
        </tr>
        </tfoot>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th v-if="showId">{{ order.id }}</th>
          <td v-if="showUser">{{ order.user }}</td>
          <td v-if="showStatus">
            <button class="button"
                    v-bind:class="{'is-success':order.status === 'DELIVERED', 'is-info':order.status === 'PAYED', 'is-link':order.status === 'ORDERED'}"
                    @click="showStatusModal(order)">{{ order.status }}
            </button>
          </td>
          <td v-if="showCreatedAt">{{ order.createdAt }}</td>
          <td>
            <button class="button">...</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals start -->
    <!-- Change status -->
    <div class="modal" v-bind:class="{'is-active':showStatusModalFlag}">
      <div class="modal-background" @click="closeStatusModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Bestellstatus Ändern</p>
          <button class="delete" aria-label="close" @click="closeStatusModal"></button>
        </header>
        <section class="modal-card-body">
          <h2 class="title is-2">Status wählen:</h2>
          <button class="button is-link" v-bind:disabled="tempOrder.status === 'ORDERED'" @click="changeOrderStatus(tempOrder, 'ORDERED')">ORDERED</button>
          <button class="button is-info" v-bind:disabled="tempOrder.status === 'PAYED'" @click="changeOrderStatus(tempOrder, 'PAYED')">PAYED</button>
          <button class="button is-success" v-bind:disabled="tempOrder.status === 'DELIVERED'" @click="changeOrderStatus(tempOrder, 'DELIVERED')">DELIVERED</button>
        </section>
      </div>
    </div>


    <!-- Modals end-->

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

export default {
  name: "Index",
  layout: 'admin',
  setup() {
    const {$axios} = useContext()
    const orders = ref([])
    const showId = ref(true)
    const showStatus = ref(true)
    const showUser = ref(true)
    const showCreatedAt = ref(true)

    const loadOrders = () => {
      $axios.get('/api/orders').then((result) => {
        const sortedOrders = result.data
        orders.value = sortedOrders.sort((a,b) => {
          if(a.id === b.id) {
            return 0
          } else if (a.id < b.id){
            return -1
          }
          else {
            return 1
          }
        })
      })
    }


    // modals
    const tempOrder = ref({})
    const showStatusModalFlag = ref(false)

    const showStatusModal = (order) => {
      tempOrder.value = order
      showStatusModalFlag.value = true
    }
    const closeStatusModal = () => {
      showStatusModalFlag.value = false
      tempOrder.value = {}
    }
    const changeOrderStatus = (order, status) => {
      $axios.patch('/api/orders/' + order.id, {status}).then(() => {
        loadOrders()
        closeStatusModal()
      })
    }

    loadOrders()

    return {
      orders,
      showId,
      showStatus,
      showUser,
      showCreatedAt,
      tempOrder,
      showStatusModalFlag,
      showStatusModal,
      closeStatusModal,
      changeOrderStatus,
    }
  },
}
</script>

<style lang="scss">
.c-orders {
  .modal-background {
    background-color: rgb(10 10 10 / 58%);
  }
}
</style>
