<template>
  <div />
</template>

<script>
import { APP_NAME } from '~/plugins/constants'

export default {
  async fetch ({ store, params, error }) {
    await store.dispatch('playlist/fetchItem', { id: params.id, error }).then(() => {
      store.dispatch('player/fetchItem', { type: 'playlist' })
    })
  },
  computed: {
    playlist () {
      return this.$store.state.playlist.item
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
