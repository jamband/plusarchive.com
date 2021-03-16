<template>
  <div>
    <fa icon="volume-up" fixed-width />
    <NLink :to="linkTo" :title="player.title" class="text-white px-3">
      {{ title() }}
    </NLink>
    <button
      class="btn btn-link align-baseline m-0 p-0 font-weight-bold text-white"
      style="font-size: 100%;"
      @click="clear()"
    >
      <fa icon="times" />
    </button>
    <div class="d-md-none pt-1 text-muted">
      {{ appName }}
    </div>
  </div>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  data () {
    return {
      appName: APP_NAME
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    linkTo () {
      return {
        name: this.player.type,
        params: { id: this.player.id }
      }
    }
  },
  methods: {
    title () {
      const maxLength = 40

      return this.player.title.length <= maxLength
        ? this.player.title
        : `${this.player.title.substring(0, maxLength)}...`
    },
    clear () {
      this.$store.dispatch('player/clear')
    }
  }
}
</script>
