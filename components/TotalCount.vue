<template>
  <div class="d-inline-block">
    <span class="badge text-muted pl-3">{{ text }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    pagination () {
      return this.$store.state.pagination
    },
    text () {
      return this.pagination.totalCount === 0
        ? 'No results found'
        : `${this.pagination.totalCount} results`
    }
  }
}
</script>
