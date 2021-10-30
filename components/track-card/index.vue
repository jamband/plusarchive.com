<template>
  <div :class="$style.card">
    <NLink
      :to="{ name: 'tracks-id', params: { id } }"
      :class="[$style.imagewrap, ratioSelector()]"
      :aria-label="title"
      @click.native="play()"
    >
      <img
        class="lazyload"
        :class="$style.image"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNQqgcAAMYAogMXSH0AAAAASUVORK5CYII="
        :data-src="image"
        :data-aspectratio="ratio()"
        alt=""
      >
      <div :class="$style.play">
        <fa :icon="audioStatusIcon()" />
      </div>
    </NLink>
    <div :class="$style.body">
      <h6 :class="$style.title">{{ title }}</h6>
      <div :class="$style.text">
        <slot />
      </div>
      <div :class="$style.footer">
        <fa icon="clock" size="sm" fixed-width /> {{ footer }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackCard',
  props: {
    id: {
      type: String,
      required: true
    },
    provider: {
      type: String,
      required: true,
      validator (value) {
        return ['Bandcamp', 'SoundCloud', 'Vimeo', 'YouTube'].includes(value)
      }
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    footer: {
      type: String,
      required: true
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    ratioSelector () {
      return ['Bandcamp', 'SoundCloud'].includes(this.provider)
        ? 'ratio ratio-1x1'
        : 'ratio ratio-16x9'
    },
    play () {
      if (this.id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    },
    ratio () {
      return ['Bandcamp', 'SoundCloud'].includes(this.provider)
        ? '1/1'
        : '16/9'
    },
    audioStatusIcon () {
      return this.id === this.player.id
        ? 'pause-circle'
        : 'play-circle'
    }
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
