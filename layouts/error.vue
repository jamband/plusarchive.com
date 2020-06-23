<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="alert alert-light">
      <fa icon="info-circle" /> {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    title () {
      const title = this.isNotFound
        ? 'Not Found'
        : 'An Error Occurred'

      return `${title} (#${this.error.statusCode}) - ${this.$app.name}`
    },
    message () {
      return this.isNotFound
        ? 'Page not found.'
        : 'An error occurred.'
    },
    isNotFound () {
      return this.error.statusCode === 404
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  layout: 'minimal'
}
</script>
