<template>
  <div class="c-category">

    <div v-if="categoryId" class="c-products">
      <h1 class="title is-1">Produktauswahl</h1>
      <div v-if="categoryProducts.length">
        <nuxt-link v-for="product in categoryProducts" :key="product.id" :to="'/'+categoryId+'/'+product.id">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="product.cover" alt="Placeholder image" style="object-fit: cover;">
              </figure>
            </div>
            <div class="card-content">
              <p class="title">
                {{product.name}}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-else>
        <h3 class="title is-3">Ups. Leider gibt es in dieser Kategorie keine Produkte</h3>
        <nuxt-link to="/categories" class="button is-primary">Zurück</nuxt-link>
      </div>

    </div>
    <div v-else class="c-CategoryOverview">
      <h1 class="title is-1">Kategorie auswahl</h1>

      <div v-if="categoriesLoading" class="c-CategoryOverview__list">
        <div v-for="index in 8" :key="index" class="card">
          <div class="card-image">
            <b-skeleton height="18rem"></b-skeleton>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <b-skeleton height="2rem"></b-skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="c-CategoryOverview__list">
        <nuxt-link v-for="category in categories" :key="category.id" :to="'/categories/'+category.id" class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="require('~/assets/img/' + category.cover)" alt="Category Cover">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ category.title }}</p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>


    </div>


  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import {useApi} from "@/composable/api";

export default {
  name: "Id",
  setup() {
    const {params, $axios} = useContext()
    const categoryId = ref(params.value.id)
    const categoriesLoading = ref(true)
    const categoryLoading = ref(true)
    const categories = ref()
    const categoryProducts = ref([])

    if (categoryId.value) {
      useApi($axios).product.findByCategoryId(categoryId.value).then((products) => {
        categoryProducts.value = products._embedded.products
      })
    } else {
      useApi($axios).category.findAll().then((categoryArray) => {
        categories.value = categoryArray
        categoriesLoading.value = false
      })
    }

    return {
      categoryId,
      categoriesLoading,
      categoryLoading,
      categories,
      categoryProducts,
    }
  }
}
</script>

<style lang="scss">
.c-CategoryOverview {
  &__list {
    margin: auto;
    max-width: 1300px;
  }

  .card {
    width: 25rem;
    display: inline-block;
    margin: 1rem;
    .card-image {
      .image {
        > img {
          object-fit: cover;
        }
      }
    }
  }
}

.c-category {
  .c-products {
    .card {
      width: 18rem;
      display: inline-block;
      margin: 1rem;
    }
  }
}

@media only screen and (max-width: 1407px) {
  .c-CategoryOverview {
    &__list {
      max-width: 880px;
    }
  }
}

@media only screen and (max-width: 895px) {
  .c-CategoryOverview {
    &__list {
      max-width: 460px;
    }
  }
}

@media only screen and (max-width: 463px) {
  .c-CategoryOverview {
    &__list {
      padding-right: 2rem;
    }
  }
}
</style>
