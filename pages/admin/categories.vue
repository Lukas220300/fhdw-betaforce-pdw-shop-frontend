<template>
  <div class="c-admin-categories">
    <div class="table-container">
      <table class="table is-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Covername</th>
          <th>Bearbeiten</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th>{{category.id}}</th>
          <td>{{ category.title }}</td>
          <td>{{ category.cover }}</td>
          <td>
            <button class="button is-secondary c-editButton" @click="changeCategory(category)">
              <Icon name="edit"></Icon>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div id="editCategoryModal" class="modal">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import {useApi} from "@/composable/api";

export default {
  name: "Categories",
  layout: 'admin',
  setup(){
    const {$axios} = useContext()
    const categories = ref([])


    const loadCategories = () => {
      useApi($axios).category.findAll().then((apiCategories) => {
        categories.value = apiCategories
      })
    }

    const changeCategory = (category) => {
      console.log(category)
      const modal = document.getElementById('editCategoryModal')
      modal.classList.add('is-active')
    }

    const closeModal = () => {
      const modal = document.getElementById('editCategoryModal')
      modal.classList.remove('is-active')
    }

    loadCategories()

    return {
      categories,
      changeCategory,
      closeModal,
    }
  },
}
</script>

<style lang="scss">
.c-admin-categories {
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
