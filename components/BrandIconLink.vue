<template>
  <span>
    <a
      v-for="(url, index) in urls"
      :key="index"
      :href="url"
      :aria-label="url"
      class="text-light"
      style="margin-right: 0.7rem;"
      rel="noopener"
      target="_blank"
    >
      <fa :icon="icon(url)" size="lg" />
    </a>
  </span>
</template>

<script>
export default {
  props: {
    links: {
      type: String,
      required: true
    }
  },
  computed: {
    urls () {
      return this.links.split('\n').filter(_ => _ !== '')
    }
  },
  methods: {
    icon (url) {
      const icons = {
        'bandcamp.com': 'bandcamp',
        'facebook.com': 'facebook-square',
        'instagram.com': 'instagram',
        'last.fm': 'lastfm-square',
        'mixcloud.com': 'mixcloud',
        'pinterest.com': 'pinterest-square',
        'soundcloud.com': 'soundcloud',
        'spotify.com': 'spotify',
        'twitter.com': 'twitter-square',
        'tumblr.com': 'tumblr-square',
        'vimeo.com': 'vimeo-square',
        'youtube.com': 'youtube-square',

        // for bandcamp
        'fikarecordings.com': 'bandcamp',
        'mamabirdrecordingco.com': 'bandcamp',
        'maybemars.org': 'bandcamp',
        'souterraine.biz': 'bandcamp'
      }
      for (const key of Object.keys(icons)) {
        if (url.includes(key)) {
          return ['fab', icons[key]]
        }
      }
      return ['fas', 'external-link-alt']
    }
  }
}
</script>
