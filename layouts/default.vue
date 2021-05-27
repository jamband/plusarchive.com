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
  methods: {
    playerShow () {
      return ['track', 'playlist'].includes(this.$route.name || '')
    }
  }
}
</script>
