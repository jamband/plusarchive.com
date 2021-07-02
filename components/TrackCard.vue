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

<style lang="scss" module>
@import "../assets/css/_variables";
@import "../node_modules/bootstrap/scss/mixins/breakpoints";
@import "../node_modules/bootstrap/scss/mixins/text-truncate";

.card {
  position: relative;

  @include media-breakpoint-down(sm) {
    border-bottom: 1px solid var(--bs-dark);
    display: flex;
    padding: 0.8rem 0;
  }

  @include media-breakpoint-up(sm) {
    background-color: var(--bs-dark);
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    box-shadow: $box-shadow-sm;
    margin-bottom: 0.4rem;
  }
}

.imagewrap {
  display: flex;

  @include media-breakpoint-down(sm) {
    height: 30%;
    width: 30%;
  }
}

.image {
  width: 100%;

  @include media-breakpoint-down(sm) {
    border-radius: $border-radius;
  }

  @include media-breakpoint-up(sm) {
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }
}

.play {
  align-items: center;
  color: var(--bs-light);
  display: flex;
  justify-content: center;
  opacity: 0.6;

  @include media-breakpoint-down(sm) {
    font-size: 150%;
  }

  @include media-breakpoint-up(sm) {
    font-size: 300%;
  }
}

.body {
  text-align: center;

  @include media-breakpoint-down(sm) {
    width: 70%;
  }

  @include media-breakpoint-up(sm) {
    padding: 1rem 1rem 0.5rem;
  }
}

.title {
  font-weight: bold;

  @include text-truncate();

  @include media-breakpoint-down(sm) {
    padding: 0 0.5rem;
  }

  @include media-breakpoint-up(sm) {
    font-size: 110%;
    margin-bottom: 0.5rem;
  }
}

.text {
  padding: 0 0.5rem;

  @include media-breakpoint-down(sm) {
    padding-bottom: 1.5rem;
  }
}

.footer {
  color: $text-muted;

  @include media-breakpoint-down(sm) {
    bottom: 0.5rem;
    font-size: 94%;
    position: absolute;
    right: 0.5rem;
  }

  @include media-breakpoint-up(sm) {
    margin-top: 1rem;
    text-align: right;
  }
}
</style>
