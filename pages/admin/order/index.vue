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
      <table class="table is-striped">
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
          <td v-if="showUser">{{ order.user.firstName }} {{ order.user.lastName }}</td>
          <td v-if="showStatus">
            <button class="button"
                    v-bind:class="{'is-success':order.status === 'DELIVERED', 'is-info':order.status === 'PAYED', 'is-link':order.status === 'ORDERED'}"
                    @click="showStatusModal(order)">{{ order.status }}
            </button>
          </td>
          <td v-if="showCreatedAt">{{ order.createdAt }}</td>
          <td>
            <button class="button" @click="showInfoModal(order)">...</button>
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
    <!-- Info Modal-->
    <div class="modal" v-bind:class="{'is-active':showInfoModalFlag}">
      <div class="modal-background" @click="closeInfoModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Bestellinfo</p>
          <button class="delete" aria-label="close" @click="closeInfoModal"></button>
        </header>
        <section v-if="tempOrder.user" class="modal-card-body">
          <h4 class="title is-4">Liferadresse</h4>
          {{ tempOrder.user.firstName }} {{ tempOrder.user.lastName }} <br>
          {{ tempOrder.user.street }} <br>
          {{ tempOrder.user.zip }} {{ tempOrder.user.city }} <br>
          Deutschland <br>
          <br>
          <h4 class="title is-4">Artickel</h4>
          <div v-for="item in tempOrder.orderItemList" :key="item.id" class="box">
            <strong>{{item.productVariant.product.name}} (Produktnummer: {{item.productVariant.product.id}}.{{item.productVariant.unit.id}})</strong> <br>
            {{ item.productVariant.unit.numberOfContainer }} X {{ item.productVariant.unit.amount }} {{ item.productVariant.unit.title }} <br>
            Menge: {{item.quantity}}
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeInfoModal">Close</button>
        </footer>
      </div>
    </div>

    <!-- Modals end-->

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
    const orders = ref([])
    const showId = ref(true)
    const showStatus = ref(true)
    const showUser = ref(true)
    const showCreatedAt = ref(true)

    const loadOrders = () => {
      useApi($axios).order.findAll().then(async (result) => {
        const sortedOrders = result._embedded.orders
        for(const orderIndex in sortedOrders) {
          const userApi = await $axios.$get(sortedOrders[orderIndex]._links.user.href)
          const orderItemList = (await $axios.get(sortedOrders[orderIndex]._links.orderItemList.href)).data
          sortedOrders[orderIndex].user = userApi
          sortedOrders[orderIndex].orderItemList = orderItemList._embedded.orderItems
          for(const itemIndex in sortedOrders[orderIndex].orderItemList) {
            const productVariantApi = (await $axios.get(sortedOrders[orderIndex].orderItemList[itemIndex]._links.productVariant.href)).data
            sortedOrders[orderIndex].orderItemList[itemIndex].productVariant = productVariantApi
            const productApi = await $axios.$get(sortedOrders[orderIndex].orderItemList[itemIndex].productVariant._links.product.href)
            sortedOrders[orderIndex].orderItemList[itemIndex].productVariant.product = productApi
            const unitApi = await $axios.$get(sortedOrders[orderIndex].orderItemList[itemIndex].productVariant._links.unit.href)
            sortedOrders[orderIndex].orderItemList[itemIndex].productVariant.unit = unitApi
          }
        }
        orders.value = sortedOrders.sort((a,b) => {
          if(a.id === b.id) {
            return 0
          } else if (a.id < b.id){
            return 1
          }
          else {
            return -1
          }
        })
      })
    }

    // modals
    const tempOrder = ref({})
    const showStatusModalFlag = ref(false)
    const showInfoModalFlag = ref(false)

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
    const showInfoModal = (order) => {
      tempOrder.value = order
      showInfoModalFlag.value = true
    }
    const closeInfoModal = () => {
      showInfoModalFlag.value = false
      tempOrder.value = {}
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
      showInfoModalFlag,
      showInfoModal,
      closeInfoModal,
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
