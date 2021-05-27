<template>
  <span class="text-muted">
    <fa icon="database" size="sm" fixed-width />
    {{ text() }}
  </span>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    text () {
      return this.total === 0
        ? 'No results found'
        : `${this.total} results`
    }
  }
}
</script>
