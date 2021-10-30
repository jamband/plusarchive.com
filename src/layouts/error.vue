<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
        <h1>{{ title }}</h1>
        <fa icon="info-circle" size="sm" /> {{ message }}
        <p class="mt-5 text-center">
          <NLink :to="{ name: 'index' }">
            <fa icon="angle-left" size="sm" fixed-width />
            Back to Home
          </NLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutsError',
  layout: 'minimal',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    title () {
      return this.isNotFound
        ? 'Not Found'
        : 'An Error Occurred'
    },
    message () {
      return this.isNotFound
        ? 'Page not found.'
        : 'An error occurred.'
    },
    isNotFound () {
      return this.error.statusCode === 404
    }
  }
}
</script>
