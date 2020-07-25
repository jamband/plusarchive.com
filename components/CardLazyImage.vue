<template>
  <img
    class="card-img-top lazyload"
    :data-src="image"
    :data-aspectratio="aspectratio"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNQqgcAAMYAogMXSH0AAAAASUVORK5CYII="
    alt=""
  >
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    aspectratio: {
      type: String,
      required: true,
      validator (value) {
        return ['1/1', '16/9'].includes(value)
      }
    }
  }
}
</script>
