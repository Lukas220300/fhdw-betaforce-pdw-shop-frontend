<template>
  <div class="c-search">
    <div class="c-search__headline">
      <div class="c-search__headlineContainer">
        <h1 class="title is-1">Suchergebnisse für</h1>
      </div>
    </div>
    <div class="c-search__input">
      <div class="control has-icons-left has-icons-right">
        <input class="input" id="searchInputFull" type="text" @change="change()" v-model="searchTerm" placeholder="Suche">
        <span class="icon is-medium is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    <div class="c-search__resultList">
      <div v-if="!loading && searchResults.length > 0">
        <div v-for="result in searchResults" :key="result.id" class="box">
          <nuxt-link :to="'/' + result.category.id + '/' + result.id">
            <div class="columns c-searchResult">
              <div class="column is-2 c-searchResult__image">
                <img :src="result.cover" class="">
              </div>
              <div class="column c-searchResult__text">
                <h2 class="title is-2">{{ result.name }}</h2>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-else-if="!loading && searchResults.length == 0 && !searchTermInSetup" class="c-search__resultListNoResults">
        <h2 class="title is-2">Wie können wir dir weiter helfen ?</h2>
      </div>
      <div v-else-if="!loading && searchResults.length == 0" class="c-search__resultListNoResults">
        <h2 class="title is-2">Ups.. Darauf haben wir keine Ergebnisse</h2>
      </div>
      <div v-else-if="loading" class="c-resultList__skeleton">
        <div class="columns c-searchResult">
          <div class="column is-2 c-searchResult__image">
            <b-skeleton height="7rem"></b-skeleton>
          </div>
          <div class="column c-searchResult__text">
            <b-skeleton height="3rem"></b-skeleton>
          </div>
        </div>
        <div class="columns c-searchResult">
          <div class="column is-2 c-searchResult__image">
            <b-skeleton height="7rem"></b-skeleton>
          </div>
          <div class="column c-searchResult__text">
            <b-skeleton height="3rem"></b-skeleton>
          </div>
        </div>
        <div class="columns c-searchResult">
          <div class="column is-2 c-searchResult__image">
            <b-skeleton height="7rem"></b-skeleton>
          </div>
          <div class="column c-searchResult__text">
            <b-skeleton height="3rem"></b-skeleton>
          </div>
        </div>
        <div class="columns c-searchResult">
          <div class="column is-2 c-searchResult__image">
            <b-skeleton height="7rem"></b-skeleton>
          </div>
          <div class="column c-searchResult__text">
            <b-skeleton height="3rem"></b-skeleton>
          </div>
        </div>
        <div class="columns c-searchResult">
          <div class="column is-2 c-searchResult__image">
            <b-skeleton height="7rem"></b-skeleton>
          </div>
          <div class="column c-searchResult__text">
            <b-skeleton height="3rem"></b-skeleton>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

export default {
  name: "Index",
  setup() {
    // have to refactor from composition api to normal api
    const loading = ref(false)
    const searchResults = ref([])
    const { app, route, $axios } = useContext()
    let search = ''
    if(route.value.query.searchTerm) {
      search = route.value.query.searchTerm
    }
    const searchTerm = ref(search)
    const searchTermInSetup = ref(searchTerm.value)

    const loadResults = (searchTerm) => {
      loading.value = true
      $axios
        .get('/api/productSearch?searchTerm=' + searchTerm)
        .then(results => {
          searchResults.value = results.data
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          loading.value = false
        })
    }

    if(searchTerm.value) {
      loadResults(searchTerm.value)
    }

    const change = () => {
      const activeElement = document.activeElement
      if (activeElement.id === 'searchInputFull') {
        searchTermInSetup.value = searchTerm.value
        app.router.push({
          path: 'suche',
          query: {
            searchTerm: searchTerm.value
          },
        })
        if(searchTerm.value) {
          loadResults(searchTerm.value)
        }
      }
    }

    return {
      loading,
      searchTerm,
      searchResults,
      searchTermInSetup,
      change,
    }
  },
  // beforeRouteUpdate(to, from, next) {}
}
</script>

<style lang="scss">
.c-search {
  &__input {
    margin-bottom: 1rem;
  }
  &__headlineContainer {
    text-align: center;
  }
  &__resultListNoResults {
    padding: 1rem;
  }
  .c-searchResult {
    &__image {
      > img {
        width: 8rem;
      }
    }
  }
}
</style>
