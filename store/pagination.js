const state = () => ({
  totalCount: 0,
  pageCount: 0,
  currentPage: 0
})

const mutations = {
  setMeta (state, item) {
    state.totalCount = item.totalCount
    state.pageCount = item.pageCount
    state.currentPage = item.currentPage
  }
}

export default {
  state,
  mutations
}
