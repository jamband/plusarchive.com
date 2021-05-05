<template>
  <div
    ref="container"
    class="row row-cols-1 row-cols-md-3 text-center card-container"
    @load.capture="masonry()"
  >
    <div v-for="track in tracks" :key="track.id" class="col mb-md-4">
      <div class="card">
        <div class="card-img-wrap">
          <NLink
            :to="{ name: 'track', params: { id: track.id } }"
            :aria-label="track.title"
            @click.native="load(track.id)"
          >
            <CardLazyImage :image="track.image" :aspectratio="aspectRatio(track.provider)" />
            <fa :icon="audioStatusIcon(track.id)" class="card-play" />
          </NLink>
        </div>
        <div class="card-body">
          <h6 class="card-title text-truncate">
            {{ track.title }}
          </h6>
          <div class="card-text">
            <NLink :to="{ query: { provider: track.provider } }" class="badge badge-secondary">
              {{ track.provider }}
            </NLink>
            <NLink v-for="genre in track.genres" :key="genre.id" :to="{ query: { genre: genre.name } }" class="badge badge-secondary" append>
              {{ genre.name }}
            </NLink>
          </div>
          <div class="card-info">
            <fa icon="clock" fixed-width /> {{ track.created_at }}
          </div>
        </div>
      </div>
      <hr class="d-md-none">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  mounted () {
    this.masonry()
  },
  methods: {
    load (id) {
      if (id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    },
    aspectRatio (provider) {
      return ['Vimeo', 'YouTube'].includes(provider)
        ? '16/9'
        : '1/1'
    },
    audioStatusIcon (id) {
      return id === this.player.id
        ? 'pause-circle'
        : 'play-circle'
    },
    masonry () {
      import('masonry-layout').then((module) => {
        /* eslint-disable no-new, new-cap */
        new module.default(this.$refs.container, {
          transitionDuration: 0
        })
      })
    }
  }
}
</script>
