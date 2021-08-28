<template>
  <div class="c-admin-categories">
    <h1 class="title is-1">Kategorien</h1>
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
          <th>{{ category.id }}</th>
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
      <button class="button is-fullwidth" @click="newItem">+ Neu</button>
    </div>

    <div id="editCategoryModal" class="modal" v-bind:class="{'is-active':showModal}">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span v-if="newMode">
              Neue Kategorie anlegen
            </span>
            <span v-else>
              Kategorie bearbeiten
            </span>
          </p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Titel</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" v-model="tempCategory.title"
                     v-bind:class="{'is-success': validateCategory.title === 1, 'is-danger': validateCategory.title === 2}">
            </div>
            <p v-if="validateCategory.title === 2" class="help is-danger">Bitte gib einen Titel ein</p>
          </div>

          <div class="field">
            <label class="label">Cover</label>
            <div class="control">
              <input class="input" type="text" placeholder="Cover" v-model="tempCategory.cover"
                     v-bind:class="{'is-success': validateCategory.cover === 1, 'is-danger': validateCategory.cover === 2}">
            </div>
            <p v-if="validateCategory.cover === 2" class="help is-danger">Bitte gib ein Cover an</p>
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
  setup() {
    const {$axios} = useContext()
    const categories = ref([])


    const loadCategories = () => {
      useApi($axios).category.findAll().then((apiCategories) => {
        categories.value = apiCategories.sort((a,b) => {
          if(a.id > b.id) {
            return 1
          } else {
            return -1
          }
        })
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
    closeModal() {
      this.showModal = false
      this.tempCategory = {}
      this.validateCategory = {}
      this.newMode = false
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
      if (validateDefaultText(this.tempCategory.title)) {
        this.validateCategory.title = 1
      } else {
        validation = false
        this.validateCategory.title = 2
      }
      if (validateDefaultText(this.tempCategory.cover)) {
        this.validateCategory.cover = 1
      } else {
        validation = false
        this.validateCategory.cover = 2
      }
      return validation
    },
    save(loadCategories, validate) {
      if (validate()) {
        if (this.newMode) {
          // neues
          useApi(this.$axios).category.addNew(this.tempCategory).then(_ => {
            this.closeModal()
            this.$buefy.toast.open({
              message: 'Kategorie wurde hinzugefügt',
              type: 'is-success'
            })
            this.newMode = false
            loadCategories()
          })
        } else {
          this.$axios.patch('/categories/' + this.tempCategory.id, {
            title: this.tempCategory.title,
            cover: this.tempCategory.cover
          })
            .then(_ => {
              this.closeModal()
              this.$buefy.toast.open({
                message: 'Kategorie wurde geändert',
                type: 'is-success'
              })
              loadCategories()
            })
        }
      }
    },
    newItem() {
      this.tempCategory = {
        title: '',
        cover: '',
      }
      this.validateCategory = {
        title: 0,
        cover: 0,
      }
      this.newMode = true
      this.showModal = true
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
