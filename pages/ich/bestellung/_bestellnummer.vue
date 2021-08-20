<template>
  <div class="c-oderDetail">
    <div v-if="order">
      <div>
        <h1 class="title is-2">Bestellung vom {{order.createdAt}}</h1>
        <h4 class="subtitle is-4">Bestellnummer {{order.id}}</h4>
      </div>
      <div>
        {{order.orderItemList}}
      </div>
    </div>
    <div v-else>
      Skeleton
    </div>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
const {useApi} = require("@/composable/api");

export default {
  name: "Bestellnummer",
  setup(){
    const {params, $axios, app} = useContext()
    let bestellnummer = -1
    if(params.value.bestellnummer) {
      bestellnummer = params.value.bestellnummer
    }
    if(bestellnummer === -1) {
      app.router.push('/ich/meine-bestellungen')
    }

    const order = ref()

    useApi($axios).order.findOneById(bestellnummer).then((response) => {
      order.value = response
    })

    return {
      order
    }
  }
}
</script>
