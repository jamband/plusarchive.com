<template>
  <div>
    <fa icon="info-circle" />
    This site uses Google Analytics to provide better experience.
    By pressing <button class="btn btn-link align-baseline m-0 p-0" @click="optIn()">I ACCEPT</button>, you consent.
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

<style lang="scss" scoped>
.btn {
  font-size: 100%;
  font-weight: bold;
}
</style>
