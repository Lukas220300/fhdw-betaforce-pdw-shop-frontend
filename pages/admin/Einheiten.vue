<template>
  <div class="c-admin-unit">
    <h1 class="title is-1">Einheiten</h1>
    <div class="table-container">
      <table class="table is-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Menge</th>
          <th>Anzahl an Einheiten</th>
          <th>Bearbeiten</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="unit in units" :key="unit.id">
          <th>{{unit.id}}</th>
          <td>{{unit.title}}</td>
          <td>{{unit.amount}}</td>
          <td>{{unit.numberOfContainer }}</td>
          <td>
            <button class="button is-secondary c-editButton" @click="changeUnit(unit)">
              <Icon name="edit"></Icon>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <button class="button is-fullwidth" @click="newUnit">+ Neu</button>
    </div>

    <div id="editCategoryModal" class="modal" v-bind:class="{'is-active':showModal}">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span v-if="newMode">
              Neue Einehit anlegen
            </span>
            <span v-else>
              Einheit bearbeiten
            </span>
          </p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Titel</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" v-model="tempUnit.title"
                     v-bind:class="{'is-success': validationUnit.title === 1, 'is-danger': validationUnit.title === 2}">
            </div>
            <p v-if="validationUnit.title === 2" class="help is-danger">Bitte gib einen Titel ein</p>
          </div>

          <div class="field">
            <label class="label">Menge</label>
            <div class="control">
              <input class="input" type="number" step="0.01" placeholder="Menge" v-model="tempUnit.amount"
                     v-bind:class="{'is-success': validationUnit.amount === 1, 'is-danger': validationUnit.amount === 2}">
            </div>
            <p v-if="validationUnit.amount === 2" class="help is-danger">Bitte gib eine Menge an</p>
          </div>

          <div class="field">
            <label class="label">Anzahl an Behälter</label>
            <div class="control">
              <input class="input" type="number" step="0.01" placeholder="Menge" v-model="tempUnit.numberOfContainer"
                     v-bind:class="{'is-success': validationUnit.numberOfContainer === 1, 'is-danger': validationUnit.numberOfContainer === 2}">
            </div>
            <p v-if="validationUnit.numberOfContainer === 2" class="help is-danger">Bitte gib eine Anzahl an Behälter an</p>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save">Save changes</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>


  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
const {validateNumber} = require("@/scripts/inputValidation/inputValidation");
const {validateDefaultText} = require("@/scripts/inputValidation/inputValidation");
const {useApi} = require("@/composable/api");

export default {
  name: "Einheiten",
  layout: 'admin',
  setup(){
    const {$axios} = useContext()
    const units = ref()
    const showModal = ref(false)
    const newMode = ref(false)
    const tempUnit = ref({})
    const validationUnit = ref({})

    const loadUnits = () => {
      useApi($axios).unit.findAll().then((apiUnits) => {
        units.value = apiUnits._embedded.units.sort((a,b) => {
          if(a.id > b.id) {
            return 1
          } else {
            return -1
          }
        })
      })
    }

    const closeModal = () => {
      showModal.value = false
      newMode.value = false
      tempUnit.value = {}
    }
    const changeUnit = (unit) => {
      tempUnit.value = unit
      validationUnit.value = {
        title: 0,
        amount: 0,
        numberOfContainer: 0,
      }
      showModal.value = true
    }
    const newUnit = () => {
      tempUnit.value = {
        title: '',
        amount: 0,
        numberOfContainer: 0,
      }
      validationUnit.value = {
        title: 0,
        amount: 0,
        numberOfContainer: 0,
      }
      newMode.value = true
      showModal.value = true
    }

    const validate = () => {
      let validation = true
      if (validateDefaultText(tempUnit.value.title)) {
        validationUnit.value.title = 1
      } else {
        validation = false
        validationUnit.value.title = 2
      }
      if (validateNumber(tempUnit.value.amount)) {
        validationUnit.value.amount = 1
      } else {
        validation = false
        validationUnit.value.amount = 2
      }
      if (validateNumber(tempUnit.value.numberOfContainer)) {
        validationUnit.value.numberOfContainer = 1
      } else {
        validation = false
        validationUnit.value.numberOfContainer = 2
      }
      return validation
    }

    const save = () => {
      if(validate()) {
        if(newMode.value) {
          useApi($axios).unit.addNew(tempUnit.value).then(() => {
            loadUnits()
            closeModal()
          })
        } else {
          useApi($axios).unit.update(tempUnit.value.id, {
            title: tempUnit.value.title,
            amount: tempUnit.value.amount,
            numberOfContainer: tempUnit.value.numberOfContainer,
          }).then(() => {
            loadUnits()
            closeModal()
          })
        }
      }
    }

    loadUnits()
    return {
      units,
      loadUnits,
      showModal,
      closeModal,
      newMode,
      tempUnit,
      changeUnit,
      validationUnit,
      newUnit,
      save,
    }
  },
}
</script>

<style lang="scss">
.c-admin-unit {
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
