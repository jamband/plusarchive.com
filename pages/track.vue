<template>
  <div />
</template>

<script>
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
      title: `${this.track.title} - ${this.$app.name}`
    }
  }
}
</script>
