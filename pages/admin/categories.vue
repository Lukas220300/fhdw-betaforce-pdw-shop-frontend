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

    <div id="editCategoryModal" class="modal" v-bind:class="{'is-active':showModal}">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Titel</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" v-model="tempCategory.title">
            </div>
            <p class="help is-danger">This email is invalid</p>
          </div>

          <div class="field">
            <label class="label">Cover</label>
            <div class="control">
              <input class="input" type="text" placeholder="Cover" v-model="tempCategory.cover">
            </div>
            <p class="help is-danger">This email is invalid</p>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save(loadCategories, validateInput)">Save changes</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import {useApi} from "@/composable/api";
import {validateDefaultText} from "@/scripts/inputValidation/inputValidation";

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

    loadCategories()

    return {
      categories,
      loadCategories,
    }
  },
  data() {
    const tempCategory = {}
    const validateCategory = {}
    const showModal = false
    const newMode = false

    return {
      tempCategory,
      showModal,
      validateCategory,
      newMode,
    }
  },
  methods: {
    closeModal()  {
      this.showModal = false
      this.tempCategory = {}
      this.validateCategory = {}
    },
    changeCategory(category) {
      this.tempCategory = category
      this.validateCategory = {
        title: 0,
        cover: 0,
      }
      this.showModal = true
    },
    validateInput() {
      let validation = true
      if(validateDefaultText(this.tempCategory.title)) {
        this.validateCategory.title = 1
      } else {
        validation = false
        this.validateCategory.title = 2
      }
      if(validateDefaultText(this.tempCategory.cover)) {
        this.validateCategory.cover = 1
      } else {
        validation = false
        this.validateCategory.cover = 2
      }

      return validation
    },
    save(loadCategories, validate){
      if(validate()) {
        if(this.newMode) {
          // neues
        } else {
          this.$axios.patch('/categories/'+this.tempCategory.id, {title: this.tempCategory.title, cover: this.tempCategory.cover})
          .then(_ => {
            this.closeModal()
            this.$buefy.toast.open({
              message: 'Kategorie wurde geändert',
              type: 'is-success'
            })
            loadCategories()
          })
        }
      } else {
        // eingaben überprüfen
      }
    }
  }
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
