export function scrollToTop () {
  if (process.client) {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
