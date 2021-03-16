export const hasTouchScreen = () => {
  if (navigator.maxTouchPoints > 0) {
    return true
  }
  if (navigator.msMaxTouchPoints > 0) {
    return true
  }
  if (window.matchMedia('(pointer:coarse)').matches) {
    return true
  }
  if ('orientation' in window) {
    return true
  }

  return false
}
