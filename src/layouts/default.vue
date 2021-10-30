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
export default {
  name: 'LayoutsDefault',
  methods: {
    playerShow () {
      return ['tracks-id', 'playlists-id'].includes(this.$route.name || '')
    }
  }
}
</script>
