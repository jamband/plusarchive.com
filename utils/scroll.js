export const scrollToTop = () => {
  if (process.client) {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}

export const dropdownResetScrollTop = (event) => {
  event.target.parentNode.parentNode.scrollTop = 0
}
