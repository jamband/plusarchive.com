const state = () => ({
  items: [],
  item: {},
  countries: [],
  tags: []
})

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setCountriesAndTags (state, data) {
    state.countries = data.countries
    state.tags = data.tags
  }
}

const actions = {
  async fetchItems ({ commit }, { query, error }) {
    const response = await this.$axios.$get('bookmarks?expand=tags', { params: query }).catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setItems', response.items)
    commit('pagination/setMeta', response._meta, { root: true })
  },
  async fetchCountriesAndTags ({ commit }, { error }) {
    const response = await this.$axios.$get('bookmarks/resources').catch((err) => {
      return error({ error: true, statusCode: err.response.status })
    })
    if (response.error) { return }
    commit('setCountriesAndTags', response)
  }
}

export default {
  state,
  mutations,
  actions
}
