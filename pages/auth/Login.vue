<template>
  <div>
    <h1 class="title is-1">Login Seite</h1>

    <div class="card c-loginForm">
      <div class="card-content">

        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input"
                    v-bind:class="{'is-success':validationData.email == 1, 'is-danger':(validationData.email != 1 && validationData.email != 0)}"
                    type="email" v-model="loginData.email" name="username"
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

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input"
                    v-bind:class="{'is-success':validationData.password == 1, 'is-danger':(validationData.password != 1 && validationData.password != 0)}"
                    type="password" dirname="password" v-model="loginData.password" name="password" placeholder="Password">
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
            <div class="control">
              <button @click="login" class="button is-link">Login</button>
            </div>
          </div>

      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <div class="content">
          <p>Neu dabei ? Hier registrieren:</p>
          <nuxt-link to="/registrieren" class="button">Registrieren</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "@nuxtjs/composition-api";
import {
  validateDefaultText,
  validateEmail,
  validateDate,
  validateNumber,
  validatePassword,
  validateCheckBox
} from "./../../scripts/inputValidation/inputValidation"

export default {
  name: "Login",
  setup() {
    const loginData = ref({
      email: '',
      password: '',
    })

    const validationData = ref({
      email: 0,
      password: 0,
    })

    const validateInput = () => {
      let validation = true

      if (!validateEmail(loginData.value.email)) {
        validation = false
        validationData.value.email = 2
      } else {
        validationData.value.email = 1
      }
      if (!validateDefaultText(loginData.value.password)) {
        validation = false
        validationData.value.password = 2
      } else {
        validationData.value.password = 1
      }

      return validation
    }

    return {
      loginData,
      validationData,
      validateInput,
    }
  },
  methods: {
    async login() {
      if (!this.validateInput()) {
        return
      }

      try {
        const response = await this.$auth.loginWith('local', { data: this.loginData })
      } catch (err) {
        this.validationData.email = 2
        this.validationData.password = 2
      }
    },
  },
}
</script>

<style lang="scss">
  .c-loginForm {
    margin-bottom: 3rem;
  }
</style>