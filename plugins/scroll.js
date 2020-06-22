export const scroll = {
  toTop: () => {
    if (process.client) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}

export default (_, inject) => {
  inject('scroll', scroll)
}
