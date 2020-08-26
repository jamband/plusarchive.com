<template>
  <div>
    <fa icon="info-circle" fixed-width />
    This site uses Google Analytics to provide better experience. By pressing
    <button
      class="btn btn-link align-baseline m-0 p-0 font-weight-bold"
      style="font-size: 100%;"
      @click="optIn()"
    >
      I ACCEPT
    </button>
    , you consent. See
    <NLink :to="{ name: 'privacy' }">
      Privacy Policy
    </NLink>
    for details.
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
