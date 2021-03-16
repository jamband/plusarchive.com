<template>
  <div class="col-md-6">
    <ul class="list-unstyled text-truncate">
      <li v-for="playlist in playlists" :key="playlist.id" class="h5">
        <NLink :to="{ name: 'playlist', params: { id: playlist.id } }" @click.native="load(playlist.id)">
          {{ playlist.title }} <fa icon="angle-right" fixed-width />
        </NLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    load (id) {
      if (id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    }
  }
}
</script>
