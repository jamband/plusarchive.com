<template>
  <div>
    <fa icon="info-circle" />
    This site uses Google Analytics to provide better experience.
    By pressing <a href="#" @click.prevent="optIn()">I ACCEPT</a>, you consent.
    See <n-link :to="{ name: 'privacy' }">Privacy Policy</n-link> for details.
  </div>
</template>

<script>
export default {
  methods: {
    optIn () {
      this.$store.dispatch('tracking/enable')
      this.$ga.enable()
    }
  }
}
</script>
