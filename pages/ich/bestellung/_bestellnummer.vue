<template>
  <div class="c-oderDetail">
    <div v-if="order">
      <div style="margin-bottom: 1rem;">
        <h1 class="title is-2">Bestellung vom {{order.createdAt}}</h1>
        <h4 class="subtitle is-4">Bestellnummer {{order.id}}</h4>
      </div>
      <div class="c-TableContainer">
        <table class="table is-striped">
          <thead>
          <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Bild</th>
            <th>Product</th>
            <th>Menge</th>
          </tr>
          </thead>
          <tfoot>
          <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Bild</th>
            <th>Product</th>
            <th>Menge</th>
          </tr>
          </tfoot>
          <tbody>
          <tr v-for="(item, index) in order.orderItemList" :key="index">
            <th>{{ index+1 }}</th>
            <td>
              <div class="c-tableImage">
                <img :src="item.productVariant.product.cover">
              </div>
            </td>
            <td>{{item.productVariant.product.name}} {{item.productVariant.unit}} X  entry.variant.unit.amount }}</td>
            <td style="text-align: right;"> {{item.quantity}} </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="c-status">
        <h4 class="subtitle is-4">Status</h4>
        <div class="c-status__container" v-bind:class="{'c-status__ordered': order.status === 'ORDERED','c-status__payed': order.status === 'PAYED','c-status__delivered': order.status === 'DELIVERED'}">
          {{order.status}}
        </div>
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
/*
todo problematik
/api gibt einen cors
ohne /api gibt einen 500er fehler..
 */
export default {
  name: "Bestellnummer",
  middleware: ['loggedIn'],
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
      /* order.value.orderItemList.forEach(async (item) => {
        if (typeof item.productVariant.unit === 'number') {
          const result = await useApi($axios).unit.findOneById(item.productVariant.unit)
          console.log(result)
        }
      }) */ // todo fetch unit if not availabele in serialization


      order.value.orderItemList.forEach((item) => {
        if (typeof item === 'number') {
          useApi($axios).orderItem.findOneById(item).then((response) => {
            console.log(response)
          })
        }
      })

      console.log(response)
    })

    return {
      order
    }
  }
}
</script>

<style lang="scss">
.c-oderDetail {
  table {
    width: 100%;
  }
  .c-tableImage {
    > img {
      object-fit: scale-down;
      width: 2rem;
      height: 2rem;
    }
  }
  .c-TableContainer {
    overflow-x: scroll;
  }
  .c-status {
    margin-top: 1rem;
    &__ordered {
      background-color: #d2e0fb;
    }
    &__payed {
      background-color: #a7d6f9;
    }
    &__delivered {
      background-color: #91f5e6;
    }
    &__container {
      padding: 1rem;
      border-radius: 15px;
      text-align: center;
      font-weight: bold;
      font-size: 25px;
    }
  }
}
</style>
