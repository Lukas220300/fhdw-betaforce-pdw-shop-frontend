<template>
  <div class="c-productDetail columns">

    <div class="column is-4">
      <b-skeleton v-if="loading" height="35rem"></b-skeleton>
      <div v-else>
        <img :src="product.cover">
      </div>
    </div>
    <div class="column is-8">
      <div class="c-productDetail__skeleton">
        <b-skeleton v-if="loading" height="4rem"></b-skeleton>
        <div v-else>
          <h1 class="title">{{ product.name }}</h1>
          <h2 class="subtitle">{{ product.category.title }} // {{product.producer}}</h2>
        </div>
      </div>
      <div class="c-productDetail__skeleton">
        <b-skeleton v-if="loading" height="30rem"></b-skeleton>
        <div v-else class="c-VariantTable__container">
          <table class="table is-striped">
            <thead>
            <tr>
              <th>Behälter</th>
              <th>Menge</th>
              <th>Preis</th>
              <th>Verfügbarkeit</th>
              <th>Warenkorb</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="variant in product.variants" :key="variant.id">
              <th>{{ variant.unit.title }}</th>
              <th>{{ variant.unit.numberOfContainer }} X {{ variant.unit.amount }}</th>
              <td style="text-align: right;">{{ variant.price }} €</td>
              <td style="text-align: right;">{{ variant.stock }} Stück</td>
              <td>
                <b-field>
                  <b-field grouped>
                    <b-numberinput v-model="variant.model" class="c-productDetail__addToCardInput"/>
                    <p class="control">
                      <button class="button c-addToCartButton" @click="addToCart(product, variant)"><Icon name="add-to-cart" /></button>
                    </p>
                  </b-field>
                </b-field>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <b-skeleton v-if="loading" height="4rem"></b-skeleton>
        <div v-else-if="product.allergens">
          Allergene:
          <nuxt-link to="/allergene">{{ product.allergens }}</nuxt-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, useContext, useRouter} from "@nuxtjs/composition-api";
import { useApi } from "@/composable/api";

export default {
  name: "ProductDetail",
  setup() {
    const {params, $axios} = useContext()
    const categoryTitle = params.value.category
    const productId = params.value.product
    const loading = ref(true);
    const product = ref()

    if (!productId) {
      if (!categoryTitle) {
        useRouter().push('/')
      } else {
        useRouter().push('/categories/' + categoryTitle)
      }
    }

    useApi($axios).product.findOneById(productId).then((apiProduct) => {
      product.value = apiProduct
      product.value.variants.forEach((variant) => {
        variant.model = 0
      })
      loading.value = false
    })



    return {
      loading,
      categoryTitle,
      productId,
      product,
    }
  },
  methods: {
    addToCart(product, variant) {
      console.log('Add to Cart: ')
      console.log(product)
      console.log(variant)
      this.$buefy.toast.open({
        message: 'Something happened correctly!',
        type: 'is-success'
      })
    }
  }
}
</script>

<style lang="scss">
.c-productDetail {
  margin-top: 1rem;

  &__skeleton {
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
