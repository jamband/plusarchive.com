<template>
  <div>
    <TheHeader />
    <div class="container">
      <nuxt />
      <transition name="player">
        <ThePlayer v-show="playerShow()" />
      </transition>
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

<style lang="scss" scoped>
.player {
  &-enter-active,
  &-leave-active {
    transition: all .3s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(50px);
  }
}
</style>
