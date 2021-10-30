<template>
  <div />
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  async asyncData ({ $axios, params, store, error }) {
    const playlist = await $axios.$get(`playlists/${params.id}`).then((response) => {
      response.type = 'playlist'
      store.dispatch('player/fetchItem', response)
      return response
    }).catch(() => {
      error({ statusCode: 404 })
    })
    return {
      playlist
    }
  },
  head () {
    return {
      title: this.playlist.title,
      meta: [
        { hid: 'description', name: 'description', content: this.playlist.title },
        { hid: 'og:title', property: 'og:title', content: `${this.playlist.title} - ${APP_NAME}` },
        { hid: 'og:description', property: 'og:description', content: this.playlist.title }
      ]
    }
  }
}
</script>
