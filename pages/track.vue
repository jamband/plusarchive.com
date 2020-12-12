<template>
  <div />
</template>

<script>
import { APP_NAME } from '~/plugins/constants'

export default {
  async asyncData ({ $axios, store, params, error }) {
    const track = await $axios.$get(`tracks/${params.id}`).then((response) => {
      response.type = 'track'
      store.dispatch('player/fetchItem', response)
      return response
    }).catch(() => {
      error({ statusCode: 404 })
    })
    return {
      track
    }
  },
  head () {
    return {
      title: this.track.title,
      meta: [
        { hid: 'description', name: 'description', content: this.track.title },
        { hid: 'og:title', property: 'og:title', content: `${this.track.title} - ${APP_NAME}` },
        { hid: 'og:description', property: 'og:description', content: this.track.title },
        { hid: 'og:image', property: 'og:image', content: this.track.image }
      ]
    }
  }
}
</script>
