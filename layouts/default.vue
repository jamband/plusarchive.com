<template>
  <div>
    <TheHeader />
    <div class="container">
      <nuxt />
      <ThePlayer v-show="playerShow()" />
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {
  methods: {
    playerShow () {
      return /^(track|playlist)$/.test(this.$route.name || '')
    }
  }
}
</script>
