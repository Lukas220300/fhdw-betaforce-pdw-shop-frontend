<template>
  <div class="c-checkout">
    <div class="c-steps c-steps--desktop">
      <progress class="progress is-link" :value="percentage" max="100"/>
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
        <input class="input" type="text"
               v-bind:class="{'is-success':ageCheckValidation === 1, 'is-danger':ageCheckValidation > 1}"
               v-model="ageCheckInput" @change="checkAgeMethod" placeholder="Prüfziffer">
        <button class="button is-primary check-button" @click="checkAgeMethod">Überprüfen</button>
        <div class="c-ageCheck__imageContainer">
          <img :src="require('~/assets/img/perso-1.jpg')" alt="persoImage">
        </div>
      </div>
    </div>
    <div v-else-if="activeStep === 1" class="c-stepView card">
      <button class="button is-primary" @click="pay">Bezahlen</button>
    </div>
    <div v-else-if="activeStep === 2" class="c-stepView card ">
      <div class="c-stepView__tableContainer">
        <table class="table is-striped">
          <thead>
          <tr>
            <th>Nr.</th>
            <th>Bezeichnung</th>
            <th>Einheit</th>
            <th>Stückpreis</th>
            <th>Menge in Stück</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(entry, index) in entries" :key="index">
            <th>{{ index + 1 }}</th>
            <th>{{ entry.product.name }}</th>
            <td>{{ entry.variant.unit.numberOfContainer }} X {{ entry.variant.unit.amount }}</td>
            <td style="text-align: right;">{{ entry.variant.price }} €</td>
            <td style="text-align: right;">{{ entry.amount }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="tableContainerPrice">
        <table>
          <tr>
            <td class="td-one">Gesammtpreis</td>
            <td class="td-two">{{ totalPrice }} €</td>
          </tr>
          <tr>
            <td class="td-one">Versandkosten</td>
            <td class="td-two">3.00 €</td>
          </tr>
          <tr style="border-top: 1px solid black; font-weight: bold;">
            <td class="td-one">Summe</td>
            <td class="td-two">{{ totalPrice + 3.00 }} €</td>
          </tr>
        </table>
      </div>
      <div>
        <h3 class="title is-3">Lieferadresse</h3>
        {{ $auth.user.firstName }} {{ $auth.user.lastName }} <br>
        {{ $auth.user.street }} <br>
        {{ $auth.user.zip }} {{ $auth.user.city }} <br>
        Deutschland <br>
      </div>
      <p style="margin: 2rem 0; font-weight: bold">Mit Klicken auf "Bestellen!", bestätigen Sie dass Sie unsere
        <nuxt-link to="/agb">AGB</nuxt-link>
        gelesen haben und mit diesen einverstanden sind.
      </p>
    </div>

    <div class="card c-navigation">
      <button v-bind:disabled="activeStep < 1" @click="setStepActive(activeStep - 1)"
              class="button is-second c-backButton">Zurück
      </button>
      <button v-bind:disabled="activeStep === numberOfSteps-1 || ageBlocked || (activeStep === 1 && paymentBlocked)"
              @click="setStepActive(activeStep + 1)" class="button is-primary c-nextButton">Weiter
      </button>
      <button v-if="activeStep === numberOfSteps-1" v-bind:disabled="ageBlocked"
              class="button is-primary c-finishButton" @click="order">Bestellen!
      </button>
    </div>

    <div class="modal" v-bind:class="{'is-active':ageCheckModalBool}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Altersbeschränkung</p>
        </header>
        <section class="modal-card-body">
          <p><strong>Sorry!</strong> Dein angegebenes und verifiziertes Alter reicht nicht aus um einige Produkte in
            deinem Warenkorb zu
            kaufen. Bitte entferne diese Produkte erst und versuche es dann noch mal oder melde dich mit einem anderem
            Account an.</p>
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
          <lottie-player src="/stop-sign.json" background="transparent" speed="1"
                         style="width: 300px; height: 300px; margin: auto;" loop
                         autoplay></lottie-player>
        </section>
        <footer class="modal-card-foot">
          <nuxt-link to="/warenkorb" class="button is-info">Zum Warenkorb</nuxt-link>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

export default {
  name: "Index",
  setup() {

    const getMinAge = (entries) => {
      let minAge = 0
      entries.forEach(entry => {
        const productMinAge = entry.product.minAge
        if (productMinAge > minAge) {
          minAge = productMinAge
        }
      })
      return minAge
    }
    const calcAge = (birthday) => {
      return new Date(new Date() - new Date(birthday)).getFullYear() - 1970
    }

    const {store, $auth, $axios, app} = useContext()
    const entries = ref(store.state.shoppingCart.entries)
    if (entries.value.length < 1) {
      app.router.push('/')
    }
    const totalPrice = ref(0.0)
    let tempTotalPrice = 0
    entries.value.forEach((entry) => {
      const entryPrice = entry.amount * entry.variant.price
      tempTotalPrice += entryPrice
    })
    totalPrice.value = Math.round(tempTotalPrice * 100) / 100
    const percentage = ref(25)
    const activeStep = ref(0)
    const minAge = getMinAge(entries.value)
    const isBlockedByAge = (minAge, user) => {
      if (minAge > 0 && !user.hasVerifiedAge) {
        return true
      } else if (minAge > 0 && user.hasVerifiedAge) {
        if (calcAge(user.birthday) >= minAge) {
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
    const ageCheckModalBool = ref(false)
    const numberOfSteps = 3
    const paymentBlocked = ref(true)
    if ($auth.user.hasVerifiedAge) {
      if (minAge > calcAge($auth.user.birthday)) {
        ageCheckModalBool.value = true
      }
    }

    const setStepActive = (index) => {
      const newIndex = index % numberOfSteps
      activeStep.value = newIndex
      percentage.value = newIndex * 25 + 25
    }

    const pay = () => {
      paymentBlocked.value = false
    }

    const checkAgeMethod = () => {
      if (ageCheckInput.value !== '' && ageCheckInput.value.length === 7) {

        const multiplikatoren = [7, 3, 1]
        let sum = 0;
        let checkNumber = -1;
        for (let index = 0; index < 7; index++) {
          const currentValue = ageCheckInput.value.charAt(index)
          const currentMultiplikator = multiplikatoren[index % 3]
          if (index !== 6) {
            sum = sum + currentValue * currentMultiplikator
          } else {
            checkNumber = currentValue * 1
          }
        }

        if ((sum % 10) === checkNumber) {
          ageCheckValidation.value = 1
          $axios.put('/api/user', {
            hasVerifiedAge: true
          }).then(() => {
            const updatedUser = {...$auth.user}
            updatedUser.hasVerifiedAge = true;
            $auth.setUser(updatedUser)
          })
          const blockedByAge = minAge > calcAge($auth.user.birthday)
          ageBlocked.value = blockedByAge
          if (blockedByAge) {
            ageCheckModalBool.value = true
          }
          return;
        }
      }

      ageCheckValidation.value = 2
      ageBlocked.value = true
    }

    const order = () => {
      const orderItemList = []
      entries.value.forEach((element) => {
        orderItemList.push({
          quantity: element.amount,
          productVariantId: element.variant.id
        })
      })
      $axios.$post('/api/order', orderItemList)
        .then(() => {
          store.commit('shoppingCart/clear')
          app.router.push('/checkout/success')

        })
        .catch(() => {
          app.router.push('/checkout/failed')
        })
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
      paymentBlocked,
      pay,
      entries,
      totalPrice,
      order,
      ageCheckModalBool,
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

  .table {
    width: 100%;
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

    &__tableContainer {
      overflow-x: scroll;
      margin-bottom: 1rem;
    }

    .td-one {
      padding-right: 1rem;
    }

    .td-two {
      float: right;
    }

    .tableContainerPrice {
      margin-bottom: 1rem;
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

@media only screen and (max-width: 1023px) {

  .c-checkout {
    .c-steps {
      .c-step {
        &--1 {
          left: 0%;
          margin-left: 1rem;
        }

        &--2 {
          left: 25%;
          margin-left: -1.5rem;
        }

        &--3 {
          left: 50%;
          margin-left: -2.1rem;
        }

        &--4 {
          left: 75%;
          margin-left: -2rem;
        }
      }
    }
  }

}

</style>
