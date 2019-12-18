<template>
  <div class="d-inline">
    {{ sortLabel() }}
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    sortLabel () {
      return this.$route.query[this.query] || this.label
    }
  }
}
</script>
