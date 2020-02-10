<template>
  <span class="badge text-muted pl-3">{{ text }}</span>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    text () {
      return this.total === 0
        ? 'No results found'
        : `${this.total} results`
    }
  }
}
</script>
