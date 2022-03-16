<template>
  <div class="p-3 text-center">
    <fa icon="info-circle" fixed-width size="sm" />
    This site uses Google Analytics to provide better experience. By pressing
    <button class="m-0 p-0 btn btn-link" @click="optIn()">
      I ACCEPT
    </button>,
    you consent. See
    <NLink :to="{ name: 'privacy' }">Privacy Policy</NLink>
    for details.
  </div>
</template>

<script>
export default {
  name: 'TheFooterTracking',
  methods: {
    optIn () {
      this.$store.dispatch('tracking/enable')
      this.$gtag.optIn()
    }
  }
}
</script>
