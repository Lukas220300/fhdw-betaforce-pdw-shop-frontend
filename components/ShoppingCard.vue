<template>
    <div>
        <button class="button is-light" @click="open = true">
            <svg v-if="products.length == 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>

            <svg v-if="products.length > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
        </button>
        <b-sidebar
            type="is-light"
            :fullheight="true"
            :overlay="true"
            :right="true"
            v-model="open"
            mobile="fullwidth"
            >
            <div v-if="products.length > 0" class="p-5 c-ShoppingCardCenterContent">
              <div v-for="product in products" :key="product.name" class="box">
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img :src="product.cover" alt="product image" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content pl-2">
                      <p>{{ product.name }}</p>
                      <p>{{ product.price }} € pro Stück</p>
                      <b-field grouped>
                        <b-numberinput v-model="product.quantity" @input="(val) => quantityInputChange(val, product.variantId)" class="c-quantityInput" min="0" :max="product.stock" controls-position="compact" />
                      </b-field>
                    </div>
                  </div>
                  <div class="media-right">
                    <button class="delete" v-on:click.stop.prevent="removeFromCard(product.variantId)"></button>
                  </div>
                </article>
              </div>
              <b-field :label="'Gesamtpreis: ' + total + ' €'" class="c-ShoppingCardCenterCta"> <!-- TODO: Add v-if="$auth.loggedIn" -->
                <p class="control">
                    <b-button type="is-primary" label="Jetzt bestellen" @click="checkout"/>
                </p>
              </b-field>
            </div>
            <div v-else class="p-5 c-ShoppingCardCenterContent">
                <h2 class="subtitle">Sie haben noch keine Produkte in den Warenkorb gelegt!</h2>
            </div>
        </b-sidebar>

        <b-loading :is-full-page="true" v-model="checkouting" ></b-loading>
    </div>
</template>

<script>
import {ref} from "@nuxtjs/composition-api";
import { mapGetters, mapState } from 'vuex'
export default {
  name: "ShoppingCard",
  setup() {
    const open = ref(false)

    return {
      open
    }
  },
   computed: {
    ...mapState('ShoppingCard', {
      checkoutStatus: 'checkoutStatus'
    }),
    ...mapGetters('ShoppingCard', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    }),
    checkouting() {
        return this.checkoutStatus == 'started'
    }
  },
  watch: {
      checkoutStatus: function (val) {
           if (this.checkoutStatus == 'successful') {
                this.$buefy.toast.open({
                    message: 'Die Bestellung wurde entgegengenommen. Eigentlich müsste man jetzt noch bezahlen und eine Bestellzusammenfassungsergebissseite sehen, aber naja, soo wichtig ist das jetzt auch nicht oder? ;)',
                    type: 'is-success',
                    duration: 8000
                })
                this.$router.push('/')
            } else if (this.checkoutStatus == 'failed') {
                this.$buefy.toast.open({
                    message: 'Bei der Bestellung ist ein Fehler unterlaufen',
                    type: 'is-danger'
                })
            }
      }
  },
  methods: {
    checkout () {
        this.$store.dispatch('ShoppingCard/checkout')
    },
    quantityInputChange(newVal, variantId) {
      this.$store.commit('ShoppingCard/updateProductQuantity', {
        quantity: newVal,
        variantId: variantId
      })
    },
    removeFromCard(variantId) {
      this.$store.commit('ShoppingCard/removeProductFromCard', {
        variantId: variantId
      })
    }
  }
}
</script>

<style lang="scss">
@media only screen and (min-width: 769px) {
  .b-sidebar .sidebar-content {
    width: 60%;
  }
}

@media only screen and (min-width: 1023px) {
  .b-sidebar .sidebar-content {
    width: 50%;
  }
}

.c-ShoppingCardCenterContent {
  margin-bottom: auto;
  margin-top: auto;
}

.c-ShoppingCardCenterCta {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.c-quantityInput {
  & input {
    width: 2.5rem;
  }
}

.box {
  width: 100%;
}
</style>
