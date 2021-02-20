<template>
  <div>
    <TheHeader />
    <div class="container">
      <Nuxt />
      <ThePlayer v-show="playerShow()" />
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {
  methods: {
    playerShow () {
      return ['track', 'playlist'].includes(this.$route.name || '')
    }
  }
}
</script>
