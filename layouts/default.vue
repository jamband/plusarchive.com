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
import TheFooter from '~/components/TheFooter'
import TheHeader from '~/components/TheHeader'
import ThePlayer from '~/components/ThePlayer'

export default {
  components: {
    TheFooter,
    TheHeader,
    ThePlayer
  },
  methods: {
    playerShow () {
      return /^(track|playlist)$/.test(this.$route.name || '')
    }
  }
}
</script>
