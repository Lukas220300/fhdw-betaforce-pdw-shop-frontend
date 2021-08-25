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
      <div class="control">
        <label class="radio">
          <input type="radio" value="0" v-model="minAgeSelected" name="age" checked>
          0
        </label>
        <label class="radio">
          <input type="radio" value="12" v-model="minAgeSelected" name="age">
          12
        </label>
        <label class="radio">
          <input type="radio" value="16" v-model="minAgeSelected" name="age">
          16
        </label>
        <label class="radio">
          <input type="radio" value="18" v-model="minAgeSelected" name="age">
          18
        </label>
        <label class="radio">
          <input type="radio" value="21" v-model="minAgeSelected" name="age">
          21
        </label>
      </div>
    </div>

    <div class="field">
      <label class="label">Kategorie</label>
      <div class="control">
        <label class="radio">
          <input type="radio" name="category" value="-1" v-model="categorySelected">
          Bitte Auswählen
        </label>
        <label v-for="category in categories" :key="category.id" class="radio">
          <input type="radio" name="category" :value="category.id" v-model="categorySelected">
          {{category.title}}
        </label>
      </div>
      <p v-if="validationProduct.allergens === 2" class="help is-danger">Bitte gib die Allergene ein</p>
    </div>

    <div class="field">
      <label class="label">Produktvarianten</label>
      <div class="control">
        Varianten
      </div>
      <p v-if="validationProduct.allergens === 2" class="help is-danger">Bitte gib die Allergene ein</p>
    </div>

    {{minAgeSelected}}
    {{categorySelected}} <br>
    {{tempProduct}} <br>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
const {useApi} = require("@/composable/api");

export default {
  name: "Neu",
  layout: 'admin',
  setup() {
    const {$axios} = useContext()
    const categories = ref()
    const minAgeSelected = ref(0)
    const categorySelected = ref(-1)

    useApi($axios).category.findAll().then((result) => {
      categories.value = result
    })

    const tempProduct = {
      name: '',
      cover: '',
      producer: '',
      allergens: '',
      variants: [],
    }

    const validationProduct = {
      name: 0,
      cover: 0,
      producer: 0,
      allergens: 0,
      minAge: 0,
      category: 0,
      variants: 0,
    }

    return {
      tempProduct,
      validationProduct,
      categories,
      minAgeSelected,
      categorySelected,
    }
  },
}
</script>

