<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>Contact <small class="text-muted">for bugs and question</small></h2>
      Please to the message via
      <a href="https://twitter.com/livejam_db" rel="noopener" target="_blank">
        <fa :icon="['fab', 'twitter']" fixed-width />Twitter
      </a>
      or
      <a href="https://github.com/jamband/plusarchive.com/issues" rel="noopener" target="_blank">
        <fa :icon="['fab', 'github']" fixed-width />GitHub
      </a>
      Issues. Thank you.
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: `Contact - ${this.$app.name}`
    }
  }
}
</script>
