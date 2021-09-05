<template>
  <div class="c-myData">
    <h1 class="title is-1">Mein Daten</h1>
    <div class="box">
      <div class="c-info">
        <div class="c-info__item c-info__item--green"/>
        Daten wurden nicht geändert
      </div>
      <div class="c-info">
        <div class="c-info__item c-info__item--yellow"/>
        Daten wurden geändert
      </div>
      <div class="c-info">
        <div class="c-info__item c-info__item--red"/>
        Eingabe ist nicht korrekt
      </div>
    </div>
    <div class="c-FormContainer">
      <div class="card">
        <div class="card-content">

          <div class="field">
            <label class="label">Vorname</label>
            <div class="control has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.firstName == 1, 'is-warning':validationData.firstName == 3, 'is-danger':(validationData.firstName == 2 && validationData.firstName != 0)}"
                     type="text" name="firstname" v-model="signUpData.firstName" placeholder="Max"
                     @change="validateInput">
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
                     v-bind:class="{'is-success':validationData.lastName == 1, 'is-warning':validationData.lastName == 3, 'is-danger':(validationData.lastName == 2 && validationData.lastName != 0)}"
                     type="text" name="lastname" v-model="signUpData.lastName" placeholder="Mustermann"
                     @change="validateInput">
              <span v-if="validationData.lastName" class="icon is-small is-right">
                <i v-if="validationData.lastName == 1" class="fas fa-check"></i>
                <i v-else class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Emai</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.email == 1, 'is-warning':validationData.email == 3, 'is-danger':(validationData.email == 2 && validationData.email != 0)}"
                     type="email" v-model="signUpData.email" name="username" @change="validateInput"
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
              v-bind:class="{'datePicker-success':validationData.birthday == 1, 'datePicker-warning':validationData.birthday == 3, 'datePicker-danger':(validationData.birthday == 2 && validationData.birthday != 0)}">
            </b-datepicker>
          </b-field>

          <div class="field">
            <label class="label">Straße + Hausnummer</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input"
                     v-bind:class="{'is-success':validationData.street == 1, 'is-warning':validationData.street == 3, 'is-danger':(validationData.street == 2 && validationData.street != 0)}"
                     type="text" name="street" v-model="signUpData.street" placeholder="Mustertraße 1"
                     @change="validateInput">
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
                     v-bind:class="{'is-success':validationData.zip == 1, 'is-warning':validationData.zip == 3, 'is-danger':(validationData.zip == 2 && validationData.zip != 0)}"
                     type="number" name="zip" v-model="signUpData.zip" placeholder="12345" @change="validateInput">
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
                     v-bind:class="{'is-success':validationData.city == 1, 'is-warning':validationData.city == 3, 'is-danger':(validationData.city == 2 && validationData.city != 0)}"
                     type="text" v-model="signUpData.city" name="city" placeholder="Musterstadt"
                     @change="validateInput">
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
                     v-bind:class="{'is-success':validationData.password == 1, 'is-warning':validationData.password == 3, 'is-danger':(validationData.password == 2 && validationData.password != 0)}"
                     type="password" dirname="password" v-model="signUpData.password" name="password"
                     @change="validateInput"
                     placeholder="Password">
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
                     v-bind:class="{'is-success':validationData.passwordRepeat == 1, 'is-warning':validationData.passwordRepeat == 3, 'is-danger':(validationData.passwordRepeat == 2 && validationData.passwordRepeat != 0)}"
                     type="password" v-model="signUpData.passwordRepeat" placeholder="Password" @change="validateInput">
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
              <button @click="changeData($axios, validateInput)" class="button is-link">Ändern</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  validateDefaultText,
  validateEmail,
  validateDate,
  validateNumber,
  validatePassword,
} from "./../../scripts/inputValidation/inputValidation"

const {useApi} = require("@/composable/api");

export default {
  name: "MeineDaten",
  middleware: ['loggedIn'],
  data() {
    const signUpData = {
      firstName: this.$auth.user.firstName,
      lastName: this.$auth.user.lastName,
      street: this.$auth.user.street,
      zip: this.$auth.user.zip,
      city: this.$auth.user.city,
      birthday: [new Date(this.$auth.user.birthday)],
      email: this.$auth.user.email,
      password: '',
      passwordRepeat: '',
    }

    const backupData = {...signUpData}

    // 0 -> undefined // 1 -> correct // 2 -> not correct
    const validationData = {
      firstName: 0,
      lastName: 0,
      street: 0,
      zip: 0,
      city: 0,
      birthday: 0,
      email: 0,
      password: 0,
      passwordRepeat: 0,
    }

    return {
      signUpData,
      validationData,
      backupData,
    }
  },
  methods: {
    validateInput() {
      let validation = true
      if (!validateDefaultText(this.signUpData.firstName)) {
        validation = false
        this.validationData.firstName = 2
      } else if (this.signUpData.firstName !== this.backupData.firstName) {
        this.validationData.firstName = 3
      } else {
        this.validationData.firstName = 1
      }
      if (!validateDefaultText(this.signUpData.lastName)) {
        validation = false
        this.validationData.lastName = 2
      } else if (this.signUpData.lastName !== this.backupData.lastName) {
        this.validationData.lastName = 3
      } else {
        this.validationData.lastName = 1
      }
      if (!validateEmail(this.signUpData.email)) {
        validation = false
        this.validationData.email = 2
      } else if (this.signUpData.email !== this.backupData.email) {
        this.validationData.email = 3
      } else {
        this.validationData.email = 1
      }
      if (!validateDate(this.signUpData.birthday)) {
        validation = false
        this.validationData.birthday = 2
      } else if (this.signUpData.birthday !== this.backupData.birthday) {
        this.validationData.birthday = 3
      } else {
        this.validationData.birthday = 1
      }
      if (!validateDefaultText(this.signUpData.street)) {
        validation = false
        this.validationData.street = 2
      } else if (this.signUpData.street !== this.backupData.street) {
        this.validationData.street = 3
      } else {
        this.validationData.street = 1
      }
      if (!validateNumber(this.signUpData.zip)) {
        validation = false
        this.validationData.zip = 2
      } else if (this.signUpData.zip !== this.backupData.zip) {
        this.validationData.zip = 3
      } else {
        this.validationData.zip = 1
      }
      if (!validateDefaultText(this.signUpData.city)) {
        validation = false
        this.validationData.city = 2
      } else if (this.signUpData.city !== this.backupData.city) {
        this.validationData.city = 3
      } else {
        this.validationData.city = 1
      }

      if (validateDefaultText(this.signUpData.password) && validateDefaultText(this.signUpData.passwordRepeat)) {
        if (!validatePassword(this.signUpData.password)) {
          validation = false
          this.validationData.password = 2
        } else if (this.signUpData.password !== this.backupData.password) {
          this.validationData.password = 3
        } else {
          this.validationData.password = 1
        }
        if (!validateDefaultText(this.signUpData.passwordRepeat) || this.signUpData.passwordRepeat !== this.signUpData.password) {
          validation = false
          this.validationData.passwordRepeat = 2
        } else if (this.signUpData.passwordRepeat !== this.backupData.passwordRepeat) {
          this.validationData.passwordRepeat = 3
        } else {
          this.validationData.passwordRepeat = 1
        }
      }

      return validation
    },
    changeData(axios, validateInput) {
      if (validateInput()) {
        const patchObject = {}
        let somethingChange = false
        let passwordChange = 0
        for (const property in this.signUpData) {
          if (property === 'password' || property === 'passwordRepeat') {
            passwordChange = passwordChange + 1
          }
          if (this.validationData[property] === 3) {
            patchObject[property] = this.signUpData[property]
            somethingChange = true
          }
        }
        if (passwordChange === 2) {
          this.$axios.$patch('/api/users', {
            password: this.signUpData.password,
            passwordRepeat: this.signUpData.passwordRepeat
          }).then(() => {
            if(!somethingChange) {
              this.$buefy.toast.open({
                message: 'Deine Password wurde geändert.',
                type: 'is-success'
              })
              this.$router.push('/ich')
            }
          })
        }
        if (somethingChange) {
          useApi(axios).user.update(this.$auth.user.id, patchObject).then((user) => {
            this.$auth.setUser(user.data)
            this.$buefy.toast.open({
              message: 'Deine Daten wurde geändert.',
              type: 'is-success'
            })
            this.$router.push('/ich')
          }).catch((error) => {
            this.$buefy.toast.open({
              message: 'Etwas ist schief gelaufen. Bitte probiere es später noch mal.',
              type: 'is-danger'
            })
            console.error(error)
          })
        }
      } else {
        this.$buefy.toast.open({
          message: 'Einige Änderungen sind valide. Bitte passe sie an.',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.c-myData {
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

  .datePicker-warning {
    .input {
      border-color: #ffe08a;
    }
  }

  .c-info {
    &__item {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      display: inline-block;
      margin-right: 0.7rem;

      &--green {
        background-color: #48c78e;
      }

      &--yellow {
        background-color: #ffe08a;
      }

      &--red {
        background-color: #f14668;
      }
    }
  }
}
</style>
