<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>About</h2>
      <p>
        {{ $app.name }} is music archive website for everyday.<br>
        This website is an open source project.
      </p>
      <BaseLinkExternal href="https://github.com/jamband/plusarchive.com">
        <fa :icon="['fab', 'github']" /> jamband/plusarchive.com
      </BaseLinkExternal>
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
      title: 'About'
    }
  }
}
</script>
