<template>
  <div>
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
          <button class="button">{{ order.status }}</button>
        </td>
        <td v-if="showCreatedAt">{{ order.createdAt }}</td>
        <td>
          <button class="button">...</button>
        </td>
      </tr>
      </tbody>
    </table>
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

    $axios.get('/api/orders').then((result) => {
      orders.value = result.data
    })

    return {
      orders,
      showId,
      showStatus,
      showUser,
      showCreatedAt,
    }
  },
}
</script>

