<template>
  <div class="c-admin-user-rights">
    <h1 class="title is-1">Benutzerrechte</h1>
    <div class="table-container">
      <table class="table is-striped">
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>MaxRole</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id" :set="maxRole = getMaxRole(user.roles)">
          <th>{{ user.id }}</th>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="button"
                    v-bind:class="{'is-success':maxRole==='ROLE_USER','is-info':maxRole==='ROLE_EMPLOYEE','is-warning':maxRole==='ROLE_ADMIN'}"
                    @click="openModal(user)">{{ maxRole }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="modal" v-bind:class="{'is-active':showModal}">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Benutzerrollen bearbeiten</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section v-if="tempUser.roles" class="modal-card-body">
          <div>
            <button class="button is-success" style="margin-bottom: 0.5rem" @click="setNewMaxRole('ROLE_USER')">ROLE_USER</button>
            <button class="button is-info" style="margin-bottom: 0.5rem" @click="setNewMaxRole('ROLE_EMPLOYEE')">ROLE_EMPLOYEE</button>
            <button class="button is-warning" style="margin-bottom: 0.5rem" @click="setNewMaxRole('ROLE_ADMIN')">ROLE_ADMIN</button>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeModal">Close</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";

const {useApi} = require("@/composable/api");

export default {
  name: "Benutzer",
  layout: 'admin',
  middleware: ['admin'],
  setup() {
    const {$axios} = useContext()
    const users = ref()
    const tempUser = ref({})
    const showModal = ref(false)
    const allRoles = ref([])

    useApi($axios).role.findAll().then((response) => {
      allRoles.value = response._embedded.roles
    })

    const findIdOfRole = (role) => {
      for (const roleIndex in allRoles.value) {
        if(allRoles.value[roleIndex].name === role) {
          return allRoles.value[roleIndex].id
        }
      }
      return -1
    }

    const loadUser = () => {
      useApi($axios).user.findAll().then(async (response) => {
        const apiUser = response._embedded.users
        for (const userIndex in apiUser) {
          const apiRoles = (await $axios.get(apiUser[userIndex]._links.roles.href)).data
          apiUser[userIndex].roles = apiRoles._embedded.roles
        }
        users.value = apiUser
      })
    }

    const getMaxRole = (roles) => {
      let maxRole = 'NONE'
      for (const roleIndex in roles) {
        if (maxRole !== 'ROLE_ADMIN') {
          if (maxRole !== 'ROLE_EMPLOYEE') {
            maxRole = roles[roleIndex].name
          } else if (roles[roleIndex].name === 'ROLE_ADMIN') {
            maxRole = roles[roleIndex].name
          }
        }
      }
      return maxRole
    }

    const openModal = (user) => {
      tempUser.value = user
      showModal.value = true
    }

    const closeModal = () => {
      tempUser.value = {}
      showModal.value = false
    }

    const setNewMaxRole = (newMaxRole) => {
      const oldMaxRole = getMaxRole(tempUser.value.roles)
      if(newMaxRole !== oldMaxRole) {
        const updateRoleUser = {}
        if(oldMaxRole === 'ROLE_USER') {
          if(newMaxRole === 'ROLE_ADMIN') {
            updateRoleUser.roles = [
              {
                id: findIdOfRole('ROLE_USER')
              },
              {
                id: findIdOfRole('ROLE_EMPLOYEE')
              },
              {
                id: findIdOfRole('ROLE_ADMIN')
              }
            ]
          } else {
            updateRoleUser.roles = [
              {
                id: findIdOfRole('ROLE_USER')
              },
              {
                id: findIdOfRole('ROLE_EMPLOYEE')
              }
            ]
          }
        } else if(oldMaxRole === 'ROLE_EMPLOYEE') {
          if(newMaxRole === 'ROLE_USER') {
            updateRoleUser.roles = [
              {
                id: findIdOfRole('ROLE_USER')
              }
            ]
          } else if (newMaxRole === 'ROLE_ADMIN') {
            updateRoleUser.roles = [
              {
                id: findIdOfRole('ROLE_USER')
              },
              {
                id: findIdOfRole('ROLE_EMPLOYEE')
              },
              {
                id: findIdOfRole('ROLE_ADMIN')
              }
            ]
          }
        } else if (oldMaxRole === 'ROLE_ADMIN'){
          if(newMaxRole === 'ROLE_USER') {
            updateRoleUser.roles = [
              {
                id: findIdOfRole('ROLE_USER')
              }
            ]
          } else if (newMaxRole === 'ROLE_EMPLOYEE') {
            updateRoleUser.roles = [
              {
                id: findIdOfRole('ROLE_USER')
              },
              {
                id: findIdOfRole('ROLE_EMPLOYEE')
              }
            ]
          }
        }

        useApi($axios).user.update(tempUser.value.id, updateRoleUser).then(_ => {
          loadUser()
        })

      }
      closeModal()
    }

    loadUser()
    return {
      users,
      getMaxRole,
      openModal,
      closeModal,
      tempUser,
      showModal,
      setNewMaxRole,
    }
  },
}
</script>

<style lang="scss">
.c-admin-user-rights {
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
