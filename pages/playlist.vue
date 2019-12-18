<template>
  <div />
</template>

<script>
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
      title: `${this.playlist.title} - ${this.$app.name}`
    }
  }
}
</script>
