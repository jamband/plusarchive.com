<template>
  <a :href="href" :rel="relValue" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    rel: {
      type: String,
      required: false,
      default: ''
    },
    noreferrer: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    relValue () {
      let rel = 'noopener'
      rel += this.noreferrer ? ' noreferrer' : ''
      rel += this.rel !== '' ? ` ${this.rel}` : ''
      return rel
    }
  }
}
</script>
