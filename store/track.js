const state = () => ({
  items: [],
  item: {},
  genres: [],
  favorites: [],
  minimalGenres: []
})

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setItem (state, item) {
    state.item = item
  },
  setGenres (state, data) {
    state.genres = data.genres
  },
  setFavorites (state, data) {
    state.favorites = data
  },
  setMinimalGenres (state, data) {
    state.minimalGenres = data
  }
}

const actions = {
  async fetchItems ({ commit }, { query, error }) {
    const response = await this.$axios.$get('tracks?expand=genres', { params: query }).catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setItems', response.items)
    commit('pagination/setMeta', response._meta, { root: true })
  },
  async fetchItem ({ commit }, { id, error }) {
    const response = await this.$axios.$get(`tracks/${id}`).catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setItem', response)
  },
  async fetchGenres ({ commit }, { error }) {
    const response = await this.$axios.$get('tracks/resources').catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setGenres', response)
  },
  async fetchFavorites ({ commit }, { error }) {
    const response = await this.$axios.$get('tracks/favorites?expand=genres').catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setFavorites', response.items)
  },
  async fetchMinimalGenres ({ commit }, { error }) {
    const limit = 38
    const response = await this.$axios.$get(`tracks/minimal-genres?limit=${limit}`).catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setMinimalGenres', response)
  }
}

export default {
  state,
  mutations,
  actions
}
