import Vue from 'vue'

Vue.prototype.$url = {
  appendQuery: (route, key, value) => {
    const query = { ...route.query }
    if (query.page) { delete query.page }
    if (query.search) { delete query.search }
    return { query: { ...query, [key]: value } }
  },
  removeQuery: (route, key) => {
    const query = { ...route.query }
    if (query.page) { delete query.page }
    if (query[key]) { delete query[key] }
    return { query }
  }
}
