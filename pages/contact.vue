<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>Contact <small class="text-muted">for bugs and question</small></h2>
      Please to the message via
      <BaseLinkExternal href="https://twitter.com/livejam_db">
        <fa :icon="['fab', 'twitter']" fixed-width />Twitter
      </BaseLinkExternal>
      or
      <BaseLinkExternal href="https://github.com/jamband/plusarchive.com/issues">
        <fa :icon="['fab', 'github']" fixed-width />GitHub
      </BaseLinkExternal>
      Issues. Thank you.
    </div>
  </div>
</template>

<script>
import BaseLinkExternal from '~/components/BaseLinkExternal'

export default {
  components: {
    BaseLinkExternal
  },
  head () {
    return {
      title: 'Contact'
    }
  }
}
</script>
