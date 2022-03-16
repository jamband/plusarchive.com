<template>
  <div class="row">
    <div class="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <h1>Contact <small class="fw-normal text-body">for bugs and question</small></h1>
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
      title: 'Contact'
    }
  }
}
</script>
