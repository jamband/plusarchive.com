<template>
  <div>
    <TheHeader />
    <div class="container pt-4 pb-8 pb-sm-7 pb-lg-6">
      <Nuxt />
      <ThePlayer v-show="playerShow()" />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import { TheFooter } from '~/components/the-footer'
import { TheHeader } from '~/components/the-header'
import { ThePlayer } from '~/components/the-player'

export default {
  name: 'LayoutsDefault',
  components: {
    TheFooter,
    TheHeader,
    ThePlayer
  },
  methods: {
    playerShow () {
      return ['tracks-id', 'playlists-id'].includes(this.$route.name || '')
    }
  }
}
</script>
