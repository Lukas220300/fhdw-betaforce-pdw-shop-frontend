<template>
  <div class="c-admin-products">
    <h1 class="title is-1">Produkte</h1>
    <div class="table-container">
      <table class="table is-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Hersteller</th>
          <th>Bearbeiten</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <th>{{product.id}}</th>
          <td>{{product.name}}</td>
          <td>{{product.producer}}</td>
          <td>
            <nuxt-link :to="'/admin/products/'+product.id" class="button is-secondary c-editButton">
              <Icon name="edit"></Icon>
            </nuxt-link>
          </td>
        </tr>
        </tbody>
      </table>
      <nuxt-link to="/admin/products/neu" class="button is-fullwidth">+ Neu</nuxt-link>
    </div>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
const {useApi} = require("@/composable/api");

export default {
  name: "Index",
  layout: 'admin',
  setup(){
    const {$axios} = useContext()
    const products = ref()

    const loadProducts = () => {
      useApi($axios).product.findAll().then((response) => {
        products.value = response._embedded.products.sort((a,b) => {
          if(a.id > b.id) {
            return 1
          } else {
            return -1
          }
        })
        console.log(response)
      })
    }


    loadProducts()

    return {
      loadProducts,
      products,
    }
  }
}
</script>

<style lang="scss">
.c-admin-products {
  .table {
    width: 100%;
  }

  .table-container {
    overflow-x: scroll;
  }

  .c-editButton {
    > svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
}
</style>
