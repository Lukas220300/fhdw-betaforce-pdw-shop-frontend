export const state = () => ({
  entries: [],
})

export const mutations = {
  addEntry(state, newEntry){
    let available = false
    state.entries.forEach((entry) => {
      if(entry.product.id === newEntry.product.id) {
        if(entry.variant.id === newEntry.variant.id) {
          available = true
          entry.amount += newEntry.amount
        }
      }
    })

    if(!available) {
      state.entries.push(newEntry)
    }
  },
  increaseEntry(state, entry) {
    const index = state.entries.indexOf(entry)
    if(index > -1) {
      state.entries[index].amount++
    }
  },
  decreaseEntry(state, entry) {
    const index = state.entries.indexOf(entry)
    if(index > -1) {
      state.entries[index].amount--
    }
  },
  removeEntry(state, entry) {
    const index = state.entries.indexOf(entry)
    if (index > -1) {
      state.entries.splice(index,1)
    }
  }
}
