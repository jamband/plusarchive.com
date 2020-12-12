<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>Playlists <small class="text-muted">via SoundCloud or YouTube</small></h2>
    </div>
    <ListPlaylists />
  </div>
</template>

<script>
import { scrollToTop } from '~/plugins/scroll'

export default {
  head () {
    return {
      title: 'Playlists'
    }
  },
  mounted () {
    scrollToTop()
  }
}
</script>
