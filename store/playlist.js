const state = () => ({
  items: [],
  item: {}
})

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setItem (state, item) {
    state.item = item
  }
}

const actions = {
  async fetchItems ({ commit }, { error }) {
    const response = await this.$axios.$get('playlists').catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setItems', response.items)
  },
  async fetchItem ({ commit }, { id, error }) {
    const response = await this.$axios.$get(`playlists/${id}`).catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setItem', response)
  }
}

export default {
  state,
  mutations,
  actions
}
