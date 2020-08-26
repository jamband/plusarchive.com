<template>
  <div />
</template>

<script>
import { APP_NAME } from '~/plugins/constants'

export default {
  async fetch ({ store, params, error }) {
    await store.dispatch('track/fetchItem', { id: params.id, error }).then(() => {
      store.dispatch('player/fetchItem', { type: 'track' })
    })
  },
  computed: {
    track () {
      return this.$store.state.track.item
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
