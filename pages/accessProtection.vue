<template>
  <div>
    <Icon name="logo"/>
    <div class="field">
      <p class="control has-icons-left">
        <input v-model="password" class="input" type="password" placeholder="Password"  @change="checkPassword">
        <span class="icon is-small is-left">
          <Icon name="lock" />
        </span>
      </p>
    </div>
    <input type="submit" class="button is-full-width" @click="checkPassword">
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

export default {
  name: "AccessProtection",
  layout: 'access',
  setup() {
    const password = ref('')
    const {store, redirect} = useContext()

    const checkPassword = () => {
      if (password.value === 'sip.shop') {
        store.commit('access/grant')
        return redirect('/')
      }
    }

    const log = (lala) => {
      console.log(lala)
    }

    return {
      password,
      checkPassword,
      log,
    }
  }
}
</script>

<style lang="scss">
.control.has-icons-left .icon.is-left {
  padding: 0.4rem;
}
</style>
