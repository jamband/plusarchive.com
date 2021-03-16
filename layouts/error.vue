<template>
  <div>
    <h1>{{ title }}</h1>
    <fa icon="info-circle" /> {{ message }}
  </div>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
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
      const title = this.isNotFound
        ? 'Not Found'
        : 'An Error Occurred'

      return `${title} (#${this.error.statusCode}) - ${APP_NAME}`
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
