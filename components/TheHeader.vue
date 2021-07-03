<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <NLink class="navbar-brand" :to="{ name: 'index' }">{{ appName }}</NLink>
      <button
        class="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbar"
        class="navbar-nav offcanvas offcanvas-end"
        tabindex="-1"
        aria-labelledby="navbarLabel"
      >
        <div class="offcanvas-header bg-dark">
          <h5 class="offcanvas-title">
            <NLink
              class="navbar-brand"
              :to="{ name: 'index' }"
              data-bs-dismiss="offcanvas"
            >
              {{ appName }}
            </NLink>
          </h5>
          <button
            type="button"
            class="me-1 btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div class="offcanvas-body bg-body">
          <NLink
            v-for="link in links.concat(moreLinks)"
            :key="link.routeName"
            :to="{ name: link.routeName }"
            :class="linkClass(link.active)"
            data-bs-dismiss="offcanvas"
          >
            {{ link.text }}
          </NLink>
        </div>
      </div>
      <div class="d-none d-md-flex navbar-nav">
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
