export const state = () => ({
  entries: [],
})

export const mutations = {
  addEntry(state, entry){
    state.entries.push(entry)
  },
  removeEntry(state, entry) {
    const index = state.entries.indexOf(entry)
    if (index > -1) {

    }
  }
}
