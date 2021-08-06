<template>
  <div class="c-LoginPage">
    <div v-if="$auth.loggedIn">
      <h1 class="title is-1">WUP! Du bist bereits eingelogged</h1>
    </div>
    <div v-else>
      <h1 class="title is-1">Login Seite</h1>

      <div class="columns">
        <div class="column box c-LoginTab">
          <p class="c-LoginTab__text">Hier Anmelden</p>
          <div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" v-model="loginData.username" placeholder="Email"
                       v-bind:class="{'is-success':validationData.username == 1, 'is-danger':(validationData.username != 1 && validationData.username != 0)}">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span v-if="validationData.username == 1" class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" v-model="loginData.password" placeholder="Password"
                       v-bind:class="{'is-success':validationData.password == 1, 'is-danger':(validationData.password != 1 && validationData.password != 0)}">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="c-AccessDeniedMessage has-text-danger" v-if="validationData.denied">
              Login Fehlgeschlagen. Benutzername oder Password ist nicht Korrekt.
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-success" @click="login()" v-bind:disabled="loginInProgress"
                        v-bind:class="{'is-loading':loginInProgress}">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
        <div class="column box c-RegisterTab">
          <p class="c-RegisterTab__text">Noch nicht Registriert ? Ja dann auf gehts:</p>
          <nuxt-link to="/registrieren" class="button is-primary is-light c-RegisterTab__button">Hier Registrieren
          </nuxt-link>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

import {
  validateEmail,
  validateDefaultText,
} from "./../../scripts/inputValidation/inputValidation"

export default {
  name: "Login",
  setup() {
    const loginData = ref({
      username: '',
      password: '',
    })

    const validationData = ref({
      username: 0,
      password: 0,
      denied: false,
    })

    const loginInProgress = ref(false)
    const {$auth} = useContext()

    const accessDenied = () => {
      validationData.value.username = 2
      validationData.value.password = 2
      validationData.value.denied = true
    }

    const validateLoginForm = () => {
      let validation = true
      if (!validateEmail(loginData.value.username)) {
        validation = false
        validationData.value.username = 2
      } else {
        validationData.value.username = 1
      }
      if (!validateDefaultText(loginData.value.password)) {
        validation = false
        validationData.value.password = 2
      } else {
        validationData.value.password = 1
      }
      return validation
    }

    const login = async () => {
      loginInProgress.value = true
      if (validateLoginForm()) {
        // @todo Unterscheidung zwischen network error und access denied
        try{
          const response = await $auth.loginWith('local', {data: loginData.value})
          console.log(response)
        } catch (error) {
          console.error(error)
          accessDenied()
        }
      }
      loginInProgress.value = false
    }

    return {
      loginData,
      validationData,
      loginInProgress,
      login,
    }
  },
}
</script>

<style lang="scss">
.c-LoginPage {
  .column {
    margin: 1rem;
  }

  .c-RegisterTab {
    &__text {
      padding: 1rem;
      font-weight: bold;
    }

    &__button {
      margin-left: 1rem;
    }
  }

  .c-LoginTab {
    &__text {
      padding: 1rem;
      font-weight: bold;
    }

    .c-AccessDeniedMessage {
      padding: 1rem;
    }
  }
}
</style>
