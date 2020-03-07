<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>About</h2>
      <p>
        {{ $app.name }} is music archive website for everyday.<br>
        This website is an open source project.
      </p>
      <BaseExternalLink href="https://github.com/jamband/plusarchive.com">
        <fa :icon="['fab', 'github']" /> jamband/plusarchive.com
      </BaseExternalLink>
    </div>
  </div>
</template>

<script>
import BaseExternalLink from '~/components/BaseLinkExternal'

export default {
  components: {
    BaseExternalLink
  },
  head () {
    return {
      title: 'About'
    }
  }
}
</script>
