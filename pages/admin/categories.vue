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

    <div class="modal" v-bind:class="{'is-active':openEditModal}">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Kategorie bearbeiten</p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section v-if="tempCategory.title" class="modal-card-body">
          <div class="field">
            <p class="control">
              <input class="input" v-model="tempCategory.title" type="text" placeholder="Title">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input" v-model="tempCategory.cover" type="text" placeholder="Covername">
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveCategory">Save changes</button>
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
    const tempCategory = ref({})
    const openEditModal = ref(false)
    const newMode = ref(false)


    const loadCategories = () => {
      useApi($axios).category.findAll().then((apiCategories) => {
        categories.value = apiCategories
      })
    }

    const changeCategory = (category) => {
      tempCategory.value = category
      openEditModal.value = true
    }

    const closeModal = () => {
      openEditModal.value = false
      tempCategory.value = {}
    }

    const saveCategory = () => {
      if(newMode.value) {
        // new mdoe
      } else {
        const patchObject = {}
        let somethingChange = false;
        if(tempCategory.value.title !== '') {
          somethingChange = true
          patchObject.title = tempCategory.value.title
        }
        if(tempCategory.value.cover !== '') {
          somethingChange = true
          patchObject.cover = tempCategory.value.cover
        }
        if(somethingChange) {
          $axios.$patch('/api/categories/'+tempCategory.value.id, patchObject)
        }
      }
    }

    loadCategories()

    return {
      categories,
      changeCategory,
      closeModal,
      tempCategory,
      openEditModal,
      saveCategory,
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
