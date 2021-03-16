<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>About</h2>
      <p>
        {{ appName }} is music archive website for everyday.<br>
        This website is an open source project.
      </p>
      <a href="https://github.com/jamband/plusarchive.com" rel="noopener" target="_blank">
        <fa :icon="['fab', 'github']" /> jamband/plusarchive.com
      </a>
    </div>
  </div>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  data () {
    return {
      appName: APP_NAME
    }
  },
  head () {
    return {
      title: 'About'
    }
  }
}
</script>
