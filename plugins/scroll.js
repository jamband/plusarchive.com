import Vue from 'vue'

Vue.prototype.$scroll = {
  toTop: () => {
    if (process.client) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
