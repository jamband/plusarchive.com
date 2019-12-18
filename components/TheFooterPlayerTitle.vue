<template>
  <div>
    <fa icon="volume-up" fixed-width />
    <n-link :to="linkTo" :title="player.title" class="text-white px-2">
      {{ title() }}
    </n-link>
    <a href="#" class="text-white" @click.prevent="clear()">
      <fa icon="times" />
    </a>
  </div>
</template>

<script>
export default {
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
