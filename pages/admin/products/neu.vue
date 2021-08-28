<template>
  <div class="c-admin-products-neu">
    <h1 class="title is-1">Neues Produkt anlegen</h1>

    <div class="field">
      <label class="label">Produktname</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name" v-model="tempProduct.name"
               v-bind:class="{'is-success': validationProduct.name === 1, 'is-danger': validationProduct.name === 2}">
      </div>
      <p v-if="validationProduct.name === 2" class="help is-danger">Bitte gib einen Namen ein</p>
    </div>

    <div class="field">
      <label class="label">Cover</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name" v-model="tempProduct.cover"
               v-bind:class="{'is-success': validationProduct.cover === 1, 'is-danger': validationProduct.cover === 2}">
      </div>
      <p v-if="validationProduct.cover === 2" class="help is-danger">Bitte gib ein Cover ein</p>
    </div>

    <div class="field">
      <label class="label">Produzent</label>
      <div class="control">
        <input class="input" type="text" placeholder="Produzent" v-model="tempProduct.producer"
               v-bind:class="{'is-success': validationProduct.producer === 1, 'is-danger': validationProduct.producer === 2}">
      </div>
      <p v-if="validationProduct.producer === 2" class="help is-danger">Bitte gib den Produzenten ein</p>
    </div>

    <div class="field">
      <label class="label">Allergene</label>
      <div class="control">
        <input class="input" type="text" placeholder="Allergene" v-model="tempProduct.allergens"
               v-bind:class="{'is-success': validationProduct.allergens === 1, 'is-danger': validationProduct.allergens === 2}">
      </div>
      <p v-if="validationProduct.allergens === 2" class="help is-danger">Bitte gib die Allergene ein</p>
    </div>

    <div class="field">
      <label class="label">Mindestalter</label>
      <div class="select">
        <select v-model="tempProduct.minAge">
          <option>0</option>
          <option>12</option>
          <option>16</option>
          <option>18</option>
          <option>21</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Kategorie</label>
      <div class="select">
        <select v-model="tempProduct.category">
          <option value="-1">Bitte Wählen...</option>
          <option v-for="category in categories" :key="category.id" v-bind:value="category.id">{{ category.title }}
          </option>
        </select>
      </div>
      <p v-if="validationProduct.allergens === 2" class="help is-danger">Bitte gib die Allergene ein</p>
    </div>

    <div class="field">
      <label class="label">Produktvarianten</label>
      <div class="control">
        <div v-for="(variant, index) in tempProduct.variants" :key="index" class="box">
          Preis: {{ variant.price }} € <br>
          Lagermenge: {{ variant.stock }} Stück <br>
          Einheit: {{ getUnitById(units, variant.unit).numberOfContainer }} X {{
            getUnitById(units, variant.unit).amount
          }} {{ getUnitById(units, variant.unit).title }} <br>
          <br>
          <button class="button" @click="editVariant(variant)">Bearbeiten</button>
        </div>
        <button class="button is-fullwidth" @click="openNewVariantModal">+ Neue Variante Anlegen</button>

      </div>
      <p v-if="validationProduct.variants === 2" class="help is-danger">Bitte erstelle mindestens eine Variante</p>
    </div>
    <br>
    <br>
    <button class="button is-primary is-fullwidth" @click="saveProduct">Produkt hinzufügen</button>

    {{ tempProduct }} <br>


    <div id="editCategoryModal" class="modal" v-bind:class="{'is-active':showVariantModal}">
      <div @click="closeModal" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span v-if="variantNewMode">
              Neue Variante anlegen
            </span>
            <span v-else>
              Variante bearbeiten
            </span>
          </p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Preis</label>
            <div class="control">
              <input class="input" type="number" step="0.01" placeholder="Preis" v-model="tempVariant.price"
                     v-bind:class="{'is-success': validationVariant.price === 1, 'is-danger': validationVariant.price === 2}">
            </div>
            <p v-if="validationVariant.price === 2" class="help is-danger">Bitte gib einen Preis ein</p>
          </div>

          <div class="field">
            <label class="label">Lagermenge</label>
            <div class="control">
              <input class="input" type="number" step="1" placeholder="Lagermenge" v-model="tempVariant.stock"
                     v-bind:class="{'is-success': validationVariant.stock === 1, 'is-danger': validationVariant.stock === 2}">
            </div>
            <p v-if="validationVariant.stock === 2" class="help is-danger">Bitte gib eine Lagermenge an</p>
          </div>

          <div class="field">
            <label class="label">Einheit</label>
            <div class="select">
              <select v-model="tempVariant.unit">
                <option value="-1">Bitte Wählen...</option>
                <option v-for="unit in units" :key="unit.id" v-bind:value="unit.id">{{ unit.numberOfContainer }} X
                  {{ unit.amount }} {{ unit.title }}
                </option>
              </select>
            </div>
            <p v-if="validationVariant.unit === 2" class="help is-danger">Bitte gib eine Einheit an</p>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveUnit">Save changes</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>


  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import {validateObjectSelect, validateNumber, validateDefaultText} from "@/scripts/inputValidation/inputValidation";

const {useApi} = require("@/composable/api");

export default {
  name: "Neu",
  layout: 'admin',
  setup() {
    const {$axios} = useContext()
    const categories = ref()
    useApi($axios).category.findAll().then((result) => {
      categories.value = result
    })

    const tempProduct = ref({
      name: '',
      cover: '',
      producer: '',
      allergens: '',
      minAge: 0,
      category: -1,
      variants: [],
    })

    const validationProduct = ref({
      name: 0,
      cover: 0,
      producer: 0,
      allergens: 0,
      minAge: 0,
      category: 0,
      variants: 0,
    })

    const getUnitById = (units, unitId) => {
      let unit
      units.forEach((eUnit) => {
        if (eUnit.id === unitId) {
          unit = eUnit
        }
      })
      return unit
    }

    const validateProduct = () => {
      let validation = true

      if (validateDefaultText(tempProduct.value.name)) {
        validationProduct.value.name = 1
      } else {
        validationProduct.value.name = 2
        validation = false
      }
      if (validateDefaultText(tempProduct.value.cover)) {
        validationProduct.value.cover = 1
      } else {
        validationProduct.value.cover = 2
        validation = false
      }
      if (validateDefaultText(tempProduct.value.producer)) {
        validationProduct.value.producer = 1
      } else {
        validationProduct.value.producer = 2
        validation = false
      }
      if (validateDefaultText(tempProduct.value.allergens)) {
        validationProduct.value.allergens = 1
      } else {
        validationProduct.value.allergens = 2
        validation = false
      }
      if (["0", "12", "16", "18", "21", 0, 12, 16, 18, 21].includes(tempProduct.value.minAge)) {
        validationProduct.value.minAge = 1
      } else {
        validationProduct.value.minAge = 2
        validation = false
      }
      if (validateObjectSelect(categories.value, tempProduct.value.category)) {
        validationProduct.value.category = 1
      } else {
        validationProduct.value.category = 2
        validation = false
      }
      if (tempProduct.value.variants.length > 0) {
        validationProduct.value.variants = 1
      } else {
        validationProduct.value.variants = 2
        validation = false
      }

      return validation
    }

    const saveProduct = () => {
      if (validateProduct()) {

        const newProduct = {}
        for (const property in tempProduct.value) {
          newProduct[property] = tempProduct.value[property]
        }
        newProduct.category = {
          id: newProduct.category
        }

        for (const variantIndex in newProduct.variants) {
          newProduct.variants[variantIndex].unit = {
            id: newProduct.variants[variantIndex].unit
          }
        }

        useApi($axios).product.addNew(newProduct).then(response => {
          console.log(response)
        })

      }
    }

    const showVariantModal = ref(false)
    const variantNewMode = ref(false)
    const units = ref()
    useApi($axios).unit.findAll().then((apiUnits) => {
      units.value = apiUnits._embedded.units
    })

    const tempVariant = ref({
      price: 0,
      stock: 0,
      unit: -1,
    })

    const validationVariant = ref({
      price: 0,
      stock: 0,
      unit: 0,
    })

    const closeModal = () => {
      showVariantModal.value = false
      variantNewMode.value = false
    }

    const openNewVariantModal = () => {
      tempVariant.value = {
        price: 0,
        stock: 0,
        unit: -1,
      }
      validationVariant.value = {
        price: 0,
        stock: 0,
        unit: 0,
      }
      variantNewMode.value = true
      showVariantModal.value = true
    }

    const editVariant = (variant) => {
      tempVariant.value = variant
      validationVariant.value = {
        price: 0,
        stock: 0,
        unit: 0,
      }
      showVariantModal.value = true
    }

    const validateVariant = () => {
      let validate = true
      if (validateNumber(tempVariant.value.price)) {
        validationVariant.value.price = 1
      } else {
        validationVariant.value.price = 2
        validate = false
      }
      if (validateNumber(tempVariant.value.stock)) {
        validationVariant.value.stock = 1
      } else {
        validationVariant.value.stock = 2
        validate = false
      }
      if (validateObjectSelect(units.value, tempVariant.value.unit)) {
        validationVariant.value.unit = 1
      } else {
        validationVariant.value.unit = 2
        validate = false
      }
      return validate
    }

    const saveUnit = () => {
      if (validateVariant()) {
        if (variantNewMode.value) {
          tempProduct.value.variants.push({...tempVariant.value})
        }
        closeModal()
      }
    }


    return {
      tempProduct,
      validationProduct,
      categories,
      showVariantModal,
      tempVariant,
      validationVariant,
      variantNewMode,
      units,
      closeModal,
      openNewVariantModal,
      saveUnit,
      getUnitById,
      editVariant,
      saveProduct,
    }
  },
}
</script>

