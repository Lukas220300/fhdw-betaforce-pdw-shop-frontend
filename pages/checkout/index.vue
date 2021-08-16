<template>
  <div class="c-checkout">
    <div class="c-steps c-steps--desktop">
      <progress class="progress is-link" :value="percentage" max="100" />
      <div class="c-step c-step--1">
        Login
      </div>
      <div class="c-step c-step--2">
        Lieferung
      </div>
      <div class="c-step c-step--3">
        Bezahlung
      </div>
      <div class="c-step c-step--4">
        Bestätigung
      </div>
    </div>

    <div v-if="activeStep === 0" class="c-stepView c-stepView--delivery card">
      <h3 class="title is-3">Lieferadresse</h3>
      {{ $auth.user.firstName }} {{ $auth.user.lastName }} <br>
      {{ $auth.user.street }} <br>
      {{ $auth.user.zip }} {{ $auth.user.city }} <br>
      Deutschland <br>
      <div class="spacer"></div>
      <h3 class="title is-3">Rechnungsadresse</h3>
      Gleiche wie Lieferadresse
      <div class="spacer"></div>
      <h3 class="title is-3">Lieferart</h3>
      <div class="control">
        <label class="radio">
          <input type="radio" name="answer" checked>
          Standardliferung innerhalb von 24 Stunden.
        </label>
        <label class="radio" disabled>
          <input type="radio" name="rsvp" disabled>
          Preium Liferung (Bald verfügbar)
        </label>
      </div>
      <div v-if="checkAge" class="spacer"></div>
      <h3 v-if="checkAge" class="title is-3">Altersüberprüfung</h3>
      <div v-if="checkAge" class="c-ageCheck">
        <p>Bitte gib die im Bild Makirte Prüfziffer ein:</p>
        <input class="input" type="text" v-bind:class="{'is-success':ageCheckValidation === 1, 'is-danger':ageCheckValidation > 1}" v-model="ageCheckInput" @change="checkAgeMethod" placeholder="Prüfziffer">
        <button class="button is-primary check-button" @click="checkAgeMethod">Überprüfen</button>
        <div class="c-ageCheck__imageContainer">
          <img :src="require('~/assets/img/perso-1.jpg')" alt="persoImage">
        </div>
      </div>
    </div>
    <div v-else-if="activeStep === 1" class="c-stepView card">
      Bezahlung
      <div class="todo">
        Bezahlung
      </div>
    </div>
    <div v-else-if="activeStep === 2" class="c-stepView card">
      Bestätigung
    </div>

    <div class="card c-navigation">
      <button v-bind:disabled="activeStep < 1" @click="setStepActive(activeStep - 1)" class="button is-second c-backButton">Zurück</button>
      <button v-bind:disabled="activeStep === numberOfSteps-1 || ageBlocked" @click="setStepActive(activeStep + 1)" class="button is-primary c-nextButton">Weiter</button>
      <button v-if="activeStep === numberOfSteps-1" v-bind:disabled="ageBlocked" class="button is-primary c-finishButton">Bestellen!</button>
    </div>

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

export default {
  name: "Index",
  setup(){

    const getMinAge = (entries) => {
      let minAge = 0
      entries.forEach(entry => {
        const productMinAge = entry.product.minAge
        if(productMinAge > minAge) {
          minAge = productMinAge
        }
      })
      return minAge
    }
    const calcAge = (birthday) => {
      return new Date(new Date() - new Date(birthday)).getFullYear() - 1970
    }

    const {store, $auth} = useContext()
    const entries = ref(store.state.shoppingCart.entries)
    if(entries.value.length < 1) {
      console.log('keine produkte da') // todo go back
    }

    const percentage = ref(25)
    const activeStep = ref(0)
    const minAge = getMinAge(entries.value)
    const isBlockedByAge = (minAge, user) => {
      if(minAge > 0 && !user.hasVerifiedAge) {
        return true
      } else if (minAge > 0 && user.hasVerifiedAge) {
        if(calcAge(user.birthday) >= minAge) {
          return false
        }
        return true
      } else if (minAge === 0) {
        return false
      } else {
        return true
      }
    }
    const ageBlocked = ref(isBlockedByAge(minAge, $auth.user))
    const checkAge = ref(minAge !== 0 && !$auth.user.hasVerifiedAge)
    const ageCheckInput = ref('')
    const ageCheckValidation = ref(0)
    const numberOfSteps = 3


    const setStepActive = (index) => {
      const newIndex = index % numberOfSteps
      activeStep.value = newIndex
      percentage.value = newIndex*25 + 25
    }

    const checkAgeMethod = () => {
      if(ageCheckInput.value !== '' && ageCheckInput.value.length === 7) {

        const multiplikatoren = [7,3,1]
        let sum = 0;
        let checkNumber = -1;
        for(let index = 0; index < 7; index++) {
          const currentValue = ageCheckInput.value.charAt(index)
          const currentMultiplikator = multiplikatoren[index % 3]
          if(index !== 6) {
            sum = sum + currentValue*currentMultiplikator
          } else {
            checkNumber = currentValue*1
          }
        }

        if((sum % 10) === checkNumber) {
          ageCheckValidation.value = 1
          // todo verifiedAge
          const blockedByAge = minAge > calcAge($auth.user.birthday)
          ageBlocked.value = blockedByAge
          if(blockedByAge) {
            console.log('Du bimst zu jung für dem shit') // todo go to warenkorb
          }
          return;
        }
      }

      ageCheckValidation.value = 2
      ageBlocked.value = true
    }

    return {
      percentage,
      activeStep,
      numberOfSteps,
      ageBlocked,
      checkAge,
      ageCheckInput,
      ageCheckValidation,
      setStepActive,
      checkAgeMethod,
    }
  },
}
</script>

<style lang="scss">
.c-checkout {
  .spacer {
    padding: 1rem;
  }
  .title {
    margin-bottom: 1rem;
  }
  .progress {
    margin-bottom: 4rem;
  }
  .c-steps {
    margin-top: 2rem;
    .c-step {
      display: inline-block;
      position: absolute;
      font-weight: bold;
      top: 2rem;
      &--1 {
        left: 0%;
        margin-left: -1rem;
      }
      &--2 {
        left: 25%;
        margin-left: -2rem;
      }
      &--3 {
        left: 50%;
        margin-left: -2rem;
      }
      &--4 {
        left: 75%;
        margin-left: -2rem;
      }
    }
  }
  .c-stepView {
    padding: 1rem;
    &--delivery {
      .radio {
        display: block;
      }
      .radio + .radio {
        margin-left: 0;
      }
      .c-ageCheck__imageContainer {
        margin-top: 1rem;
      }
      .check-button {
        margin-top: 1rem;
      }
    }
  }
  .c-navigation {
    margin-top: 2rem;
    padding: 1rem;
    .c-backButton {
      padding-left: 2rem;
      padding-right: 2rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
    .c-nextButton {
      padding-right: 2rem;
      padding-left: 2rem;
      margin-right: 1rem;
    }
    .c-finishButton {
      padding-right: 2rem;
      padding-left: 2rem;
    }
  }
}
</style>
