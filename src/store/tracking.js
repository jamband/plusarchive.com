const state = () => ({
  disable: true
})

const mutations = {
  disable (state) {
    state.disable = true
  },
  enable (state) {
    state.disable = false
  }
}

const actions = {
  disable ({ commit }) {
    commit('disable')
  },
  enable ({ commit }) {
    commit('enable')
  }
}

export default {
  state,
  mutations,
  actions
}
