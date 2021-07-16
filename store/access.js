export const state = () => ({
  access: false
})

export const mutations = {
  grant(state) {
    state.access = true
  },
  refuse(state) {
    state.access = false
  }
}
