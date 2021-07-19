<template>
  <div class="c-home">
    <StageSlider :slides="slides"/>
    <h2 class="title is-2">Kategorien</h2>
    <div>
      <b-skeleton v-if="categoriesIsLoading" height="20rem"></b-skeleton>
      <b-carousel-list :data="categories" :items-to-show="numberOfCategories" :repeat="true" :arrow-hover="false"
                       class="c-category-slider__container">
        <template #item="list">
          <nuxt-link :to="'/categories/' + list.id">
            <div class="c-category-slider card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="require('~/assets/img/' + list.cover)" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <p class="title">
                  {{ list.title }}
                </p>
              </div>
            </div>
          </nuxt-link>

        </template>
      </b-carousel-list>
      <div class="c-category-list">
        <nuxt-link v-for="category in categories" :key="category.id" :to="'/categories/' + category.id">
          <div class="c-category-list card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="require('~/assets/img/' + category.cover)" alt="Category Cover">
              </figure>
            </div>
            <div class="card-content">
              <p class="title">
                {{ category.title }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <h2 class="title is-2">Login</h2>
    <div>
      <nuxt-link to="/auth/login" class="button is-info is-rounded is-large">Hier gehts zum Login</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, useContext} from "@nuxtjs/composition-api";
import StageSlider from "@/components/StageSlider.vue";
import {Category} from "~/composable/api/interfaces/category";
import {useApi} from "~/composable/api";

export default defineComponent({
  components: {StageSlider},
  setup() {
    // definitions
    const {$axios} = useContext()
    const categoriesIsLoading = ref(true)
    const categories = ref<Category[]>()

    // api fetches
    useApi($axios).category.findAll().then((categoryArray) => {
      categories.value = categoryArray
      console.log(categoryArray)
      categoriesIsLoading.value = false
    })

    // other
    const slides = [
      {imageName: 'sample/sample-3.jpg', link: '/'},
      {imageName: 'sample/sample-2.jpg', link: '/'},
      {imageName: 'sample/sample-1.jpg', link: '/'},
    ]

    return {
      slides,
      categories,
      categoriesIsLoading,
    }
  },
  data() {
    return {
      numberOfCategories: 4,
    }
  },
  mounted() {

    const calculateNumberOfCategories = () => {
      const screenWidth = window.innerWidth

      let number = 4

      if (screenWidth > 1215) {
        number = 4
      } else if (screenWidth <= 1215 && screenWidth > 840) {
        number = 3
      } else if (screenWidth <= 840 && screenWidth > 536) {
        number = 2
      }
      this.numberOfCategories = number
    }

    calculateNumberOfCategories()
    window.onresize = () => {
      calculateNumberOfCategories()
    }
  }
})

</script>

<style lang="scss">
.c-category-slider {
  //margin-left: 0.5rem;
  //margin-right: 0.5rem;
  height: 100%;
  padding: 1rem;

  &__title {
    font-weight: bold;
    font-size: 1rem;
    position: absolute;
    bottom: 1rem;
    z-index: 1;
    text-transform: uppercase;
  }
}

.c-category-list {
  display: none;
  margin-bottom: 1rem;
  padding: 1rem;
}

.c-home {
  .carousel-slide {
    padding: 1rem;
  }

  .carousel-list.c-category-slider__container.has-shadow {
    box-shadow: none;
  }

  .c-category-list {
    .card-content {
      .title {
        text-align: center;
      }
    }
  }
}

@media only screen and (max-width: 536px) {
  .c-category-slider {
    display: none;
  }
  .c-category-list {
    display: block;
  }

  .icon.has-icons-right {
    display: none;
  }
  .icon.has-icons-left {
    display: none;
  }
}
</style>
