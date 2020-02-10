<template>
  <div>
    <div :class="aspectRatio" class="embed-responsive">
      <ThePlayerLoading v-if="player.loading" />
      <template v-show="!player.loading">
        <iframe :key="player.id" :src="player.src" class="embed-responsive-item" frameborder="0" allowfullscreen @load="load()" />
      </template>
    </div>

    <h5 class="text-center my-2">
      {{ player.title }} <small class="text-muted">via {{ player.provider }}</small>
    </h5>

    <p class="text-center small">
      <n-link :to="backTo">
        <fa icon="angle-left" fixed-width />Back to {{ backToLabel }}
      </n-link>
      <span class="text-muted px-1">or</span>
      <n-link :to="{ name: 'home' }">Recent Favorites</n-link>
    </p>
  </div>
</template>

<script>
import ThePlayerLoading from '~/components/ThePlayerLoading'

export default {
  components: {
    ThePlayerLoading
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    aspectRatio () {
      return /^(Vimeo|YouTube)$/.test(this.player.provider)
        ? 'embed-responsive-16by9'
        : 'embed-responsive-1by1-half'
    },
    backTo () {
      const name = this.$route.name === 'track'
        ? 'tracks'
        : 'playlists'

      return { name }
    },
    backToLabel () {
      return this.player.type === 'track'
        ? 'Tracks'
        : 'Playlists'
    }
  },
  methods: {
    load () {
      this.$store.dispatch('player/loading', { status: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/variables";
@import "~bootstrap/scss/mixins/breakpoints";

.embed-responsive {
  &-1by1-half {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-bottom: 100%;
    }

    @include media-breakpoint-up(lg) {
      width: 56.25%;
      margin: 0 auto;
      padding-bottom: 56.25%;
    }
  }
}
</style>
