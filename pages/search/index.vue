<template>
  <div class="content">
    <h1 class="title">Suchergebnisse für {{ searchTerm }}</h1>

    <Table :data="tableData" :columns="tableColumns"/>

    <b-loading :is-full-page="true" v-model="isLoading" ></b-loading>
  </div>
</template>

<script>
import {ref, useRoute, useContext, useRouter} from "@nuxtjs/composition-api";
import {Product} from '~/composable/api/interfaces/product';
export default {
  name: "SearchResult",
  setup() {    
    const isLoading = ref(true)
    const searchTerm = ref('')
    const route = useRoute()
    searchTerm.value = route.value.query['searchTerm']
    let tableData = []

    const {$axios} = useContext()
    const router = useRouter()
    $axios.get('/api/productSearch?searchTerm=' + searchTerm.value).then((resultArray) => {
        if (resultArray.length == 0) {
            tableData.push({'product': 'Keine Einträge gefunden'})
        } else {
            resultArray.data.forEach(element => {
                const categoryId = element.category.id ?? element.category
                const resolved = router.resolve('/' + categoryId + '/' + element.id)
                tableData.push({'product': '<a href="' + resolved.href + '">' + element.name + '</a>'})
            });
        }

        isLoading.value = false
    })
    .catch((error) => {
        console.log("Search error: " + error)
    })

    return {
      searchTerm,
      tableData,
      tableColumns: [
          {field: 'product', label: 'Produkt', centered: true}
      ],
      isLoading
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.searchTerm = to.query['searchTerm']

    this.isLoading = true
    this.$axios.get('/api/productSearch?searchTerm=' + this.searchTerm).then((resultArray) => {
        this.tableData = []
        if (resultArray.length == 0) {
            this.tableData.push({'product': 'Keine Einträge gefunden'})
        } else {
            resultArray.data.forEach(element => {
                const categoryId = element.category.id ?? element.category
                const resolved = this.$router.resolve('/' + categoryId + '/' + element.id)
                this.tableData.push({'product': '<a href="' + resolved.href + '">' + element.name + '</a>'})
            });
        }

        this.isLoading = false
    })
    .catch((error) => {
        console.log("Search error: " + error)
    })

    next()
  }
}
</script>
