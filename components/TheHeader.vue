<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <NLink class="navbar-brand" :to="{ name:'home' }">{{ appName }}</NLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarCollapse" ref="collapse" class="collapse navbar-collapse">
        <div
          class="d-md-none navbar-nav"
          role="presentation"
          @click="hideNavigation()"
        >
          <NLink :to="{ name: 'home' }" :class="linkClass('home')">Home</NLink>
          <NLink :to="{ name: 'tracks' }" :class="linkClass('track')">Track</NLink>
          <NLink :to="{ name: 'playlists' }" :class="linkClass('playlist')">Playlist</NLink>
          <NLink :to="{ name: 'labels' }" :class="linkClass('label')">Label</NLink>
          <NLink :to="{ name: 'stores' }" :class="linkClass('store')">Store</NLink>
          <NLink :to="{ name: 'bookmarks' }" :class="linkClass('bookmark')">Bookmark</NLink>
          <NLink :to="{ name: 'about' }" :class="linkClass('about')">About</NLink>
          <NLink :to="{ name: 'privacy' }" :class="linkClass('privacy')">Privacy</NLink>
          <NLink :to="{ name: 'contact' }" :class="linkClass('contact')">Contact</NLink>
          <NLink :to="{ name: 'third-party-licenses' }" :class="linkClass('third-party-licenses')">Third-Party Licenses</NLink>
        </div>
        <div class="d-none d-md-flex navbar-nav">
          <NLink :to="{ name: 'tracks' }" :class="linkClass('track')">Track</NLink>
          <NLink :to="{ name: 'playlists' }" :class="linkClass('playlist')">Playlist</NLink>
          <NLink :to="{ name: 'labels' }" :class="linkClass('label')">Label</NLink>
          <NLink :to="{ name: 'stores' }" :class="linkClass('store')">Store</NLink>
          <NLink :to="{ name: 'bookmarks' }" :class="linkClass('bookmark')">Bookmark</NLink>
          <AppDropdown id="headerMoreLinks" nav>
            <AppDropdownLink :to="{ name: 'about' }">About</AppDropdownLink>
            <AppDropdownLink :to="{ name: 'privacy' }">Privacy</AppDropdownLink>
            <AppDropdownLink :to="{ name: 'contact' }">Contact</AppDropdownLink>
            <AppDropdownLink :to="{ name: 'third-party-licenses' }">Third-Party Licenses</AppDropdownLink>
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
      appName: APP_NAME
    }
  },
  methods: {
    linkClass (value) {
      const selector = 'nav-link'
      const routeName = this.$route.name || ''
      return routeName.includes(value) ? `${selector} active` : selector
    },
    hideNavigation () {
      /* eslint-disable new-cap */
      import('bootstrap/js/dist/collapse').then((module) => {
        new module.default(this.$refs.collapse).hide()
      })
    }
  }
}
</script>
