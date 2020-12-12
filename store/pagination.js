const state = () => ({
  totalCount: 0,
  pageCount: 0,
  currentPage: 0
})

const mutations = {
  setItem (state, items) {
    state.totalCount = items.totalCount
    state.pageCount = items.pageCount
    state.currentPage = items.currentPage
  }
}

const actions = {
  fetchItem ({ commit }, items) {
    commit('setItem', items)
  }
}

export default {
  state,
  mutations,
  actions
}
