<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <NLink class="navbar-brand" :to="{ name: 'index' }">{{ appName }}</NLink>
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.capture="toggleNavigation()"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbar" ref="collapse" class="collapse navbar-collapse">
        <div class="d-md-none navbar-nav">
          <NLink
            v-for="link in links.concat(moreLinks)"
            :key="link.routeName"
            :to="{ name: link.routeName }"
            :class="linkClass(link.active)"
            @click.native.capture="toggleNavigation()"
          >
            {{ link.text }}
          </NLink>
        </div>
        <div class="d-none d-md-flex navbar-nav me-auto">
          <NLink
            v-for="link in links"
            :key="link.routeName"
            :to="{ name: link.routeName }"
            :class="linkClass(link.active)"
          >
            {{ link.text }}
          </NLink>
          <AppDropdown id="headerMoreLinks" nav>
            <AppDropdownHeader>More Links</AppDropdownHeader>
            <AppDropdownLink
              v-for="link in moreLinks"
              :key="link.routeName"
              :to="{ name: link.routeName }"
            >
              {{ link.text }}
            </AppDropdownLink>
          </AppDropdown>
        </div>
        <SearchForm class="ms-auto d-none d-md-flex" />
      </div>
    </div>
  </nav>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  data () {
    return {
      appName: APP_NAME,
      links: [
        { routeName: 'tracks', text: 'Tracks', active: ['tracks', 'tracks-id', 'tracks-search'] },
        { routeName: 'playlists', text: 'Playlists', active: ['playlists', 'playlists-id'] },
        { routeName: 'labels', text: 'Labels', active: ['labels', 'labels-search'] },
        { routeName: 'stores', text: 'Stores', active: ['stores', 'stores-search'] },
        { routeName: 'bookmarks', text: 'Bookmarks', active: ['bookmarks', 'bookmarks-search'] }
      ],
      moreLinks: [
        { routeName: 'about', text: 'About', active: ['about'] },
        { routeName: 'privacy', text: 'Privacy', active: ['privacy'] },
        { routeName: 'contact', text: 'Contact', active: ['contact'] },
        { routeName: 'third-party-licenses', text: 'Third-Party Licenses', active: ['third-party-licenses'] }
      ]
    }
  },
  methods: {
    toggleNavigation () {
      import('bootstrap/js/dist/collapse').then((module) => {
        /* eslint-disable-next-line new-cap */
        new module.default(this.$refs.collapse).toggle()
      })
    },
    linkClass (routeNames) {
      let selector = 'nav-link'
      if (routeNames.includes(this.$route.name || '')) {
        selector += ' active'
      }
      return selector
    }
  }
}
</script>
