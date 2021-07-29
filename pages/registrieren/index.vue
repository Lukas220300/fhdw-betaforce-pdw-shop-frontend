<template>
  <div class="c-signUp">
    <h1 class="title is-1">Registrierung</h1>
    <div class="c-FormContainer">
      <div class="card">
        <div class="card-content">

          <div class="field">
            <label class="label">Vorname</label>
            <div class="control has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.firstName == 1, 'is-danger':(validationData.firstName != 1 && validationData.firstName != 0)}"
                     type="text" name="firstname" v-model="signUpData.firstName" placeholder="Max">
              <span v-if="validationData.firstName" class="icon is-small is-right">
                <i v-if="validationData.firstName == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Nachname</label>
            <div class="control has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.lastName == 1, 'is-danger':(validationData.lastName != 1 && validationData.lastName != 0)}"
                     type="text" name="lastname" v-model="signUpData.lastName" placeholder="Mustermann">
              <span v-if="validationData.lastName" class="icon is-small is-right">
                <i v-if="validationData.lastName == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.email == 1, 'is-danger':(validationData.email != 1 && validationData.email != 0)}"
                     type="email" v-model="signUpData.email" name="username"
                     placeholder="max.mustermann@muster.de">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span v-if="validationData.email" class="icon is-small is-right">
                <i v-if="validationData.email == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <b-field label="Geburtstag">
            <b-datepicker
              v-model="signUpData.birthday"
              placeholder="01.01.2000"
              icon="calendar-today"
              trap-focus
              v-bind:class="{'datePicker-success':validationData.birthday == 1, 'datePicker-danger':(validationData.birthday != 1 && validationData.birthday != 0)}">
            </b-datepicker>
          </b-field>

          <div class="field">
            <label class="label">Straße + Hausnummer</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.street == 1, 'is-danger':(validationData.street != 1 && validationData.street != 0)}"
                     type="text" name="street" v-model="signUpData.street" placeholder="Mustertraße 1">
              <span class="icon is-small is-left">
                <i class="fas fa-road"></i>
              </span>
              <span v-if="validationData.street" class="icon is-small is-right">
                <i v-if="validationData.street == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Postleitzahl</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.zip == 1, 'is-danger':(validationData.zip != 1 && validationData.zip != 0)}"
                     type="number" name="zip" v-model="signUpData.zip" placeholder="12345">
              <span class="icon is-small is-left">
                <i class="fas fa-map-marked-alt"></i>
              </span>
              <span v-if="validationData.zip" class="icon is-small is-right">
                <i v-if="validationData.zip == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Stadt</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.city == 1, 'is-danger':(validationData.city != 1 && validationData.city != 0)}"
                     type="text" v-model="signUpData.city" name="city" placeholder="Musterstadt">
              <span class="icon is-small is-left">
                <i class="fas fa-city"></i>
              </span>
              <span v-if="validationData.city" class="icon is-small is-right">
                <i v-if="validationData.city == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Land</label>
            <div class="control">
              <div class="select">
                <select disabled>
                  <option>Deutschland</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.password == 1, 'is-danger':(validationData.password != 1 && validationData.password != 0)}"
                     type="password" dirname="password" v-model="signUpData.password" name="password" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              <span v-if="validationData.password" class="icon is-small is-right">
                <i v-if="validationData.password == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Password wiederholen</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.passwordRepeat == 1, 'is-danger':(validationData.passwordRepeat != 1 && validationData.passwordRepeat != 0)}"
                     type="password" v-model="signUpData.passwordRepeat" placeholder="Password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              <span v-if="validationData.passwordRepeat" class="icon is-small is-right">
                <i v-if="validationData.passwordRepeat == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox"
                     v-bind:class="{'privacy-success':validationData.privacyStatement == 1, 'privacy-danger':(validationData.privacyStatement != 1 && validationData.privacyStatement != 0)}">
                <input type="checkbox" name="privacyStatement" v-model="signUpData.privacyStatement">
                Ich stimme den
                <nuxt-link to="/privacy">Datenschutzbedingungen</nuxt-link>
                zu.
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button @click="signUp" class="button is-link">Registrieren</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import {
  validateDefaultText,
  validateEmail,
  validateDate,
  validateNumber,
  validatePassword,
  validateCheckBox
} from "./../../scripts/inputValidation/inputValidation"

export default {
  name: "Index",
  setup() {
    const signUpData = ref({
      firstName: '',
      lastName: '',
      street: '',
      zip: '',
      city: '',
      birthday: [],
      email: '',
      password: '',
      passwordRepeat: '',
      privacyStatement: false,
    })

    // 0 -> undefined // 1 -> correct // 2 -> not correct
    const validationData = ref({
      firstName: 0,
      lastName: 0,
      street: 0,
      zip: 0,
      city: 0,
      birthday: 0,
      email: 0,
      password: 0,
      passwordRepeat: 0,
      privacyStatement: 0,
    })

    const validateInput = () => {
      let validation = true
      if (!validateDefaultText(signUpData.value.firstName)) {
        validation = false
        validationData.value.firstName = 2
      } else {
        validationData.value.firstName = 1
      }
      if (!validateDefaultText(signUpData.value.lastName)) {
        validation = false
        validationData.value.lastName = 2
      } else {
        validationData.value.lastName = 1
      }
      if (!validateEmail(signUpData.value.email)) {
        validation = false
        validationData.value.email = 2
      } else {
        validationData.value.email = 1
      }
      if (!validateDate(signUpData.value.birthday)) {
        validation = false
        validationData.value.birthday = 2
      } else {
        validationData.value.birthday = 1
      }
      if (!validateDefaultText(signUpData.value.street)) {
        validation = false
        validationData.value.street = 2
      } else {
        validationData.value.street = 1
      }
      if (!validateNumber(signUpData.value.zip)) {
        validation = false
        validationData.value.zip = 2
      } else {
        validationData.value.zip = 1
      }
      if (!validateDefaultText(signUpData.value.city)) {
        validation = false
        validationData.value.city = 2
      } else {
        validationData.value.city = 1
      }
      if (!validatePassword(signUpData.value.password)) {
        validation = false
        validationData.value.password = 2
      } else {
        validationData.value.password = 1
      }
      if (!validateDefaultText(signUpData.value.passwordRepeat) || signUpData.value.passwordRepeat !== signUpData.value.password) {
        validation = false
        validationData.value.passwordRepeat = 2
      } else {
        validationData.value.passwordRepeat = 1
      }
      if (!validateCheckBox(signUpData.value.privacyStatement)) {
        validation = false
        validationData.value.privacyStatement = 2
      } else {
        validationData.value.privacyStatement = 1
      }

      return validation
    }

    const {params, $axios} = useContext()

    const signUp = () => {
      if (validateInput()) {
        console.log("Register")
        $axios.$post('/api/auth/register', signUpData).then((response) => {
          console.log(response)
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log(error.message)
          }
        })
      } else {
        console.log("wrong")
      }
    }

    return {
      signUpData,
      validationData,
      signUp,
    }
  },
}
</script>

<style lang="scss">
.c-signUp {
  margin-bottom: 5rem;
  .datePicker-success {
    .input {
      border-color: #48c78e;
    }
  }
  .datePicker-danger {
    .input {
      border-color: #f14668;
    }
  }
  .privacy-success {
    color: #48c78e;
  }
  .privacy-danger {
    color: #f14668;
  }
}
</style>
