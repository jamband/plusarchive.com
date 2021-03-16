<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="mb-3">
    <div class="container">
      <NLink class="navbar-brand" :to="{ name:'home' }">{{ appName }}</NLink>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home' }" :link-classes="{ active: isActive('home') }" class="d-md-none">Home</b-nav-item>
          <b-nav-item :to="{ name: 'tracks' }" :link-classes="{ active: isActive('track') }">Track</b-nav-item>
          <b-nav-item :to="{ name: 'playlists' }" :link-classes="{ active: isActive('playlist') }">Playlist</b-nav-item>
          <b-nav-item :to="{ name: 'labels' }" :link-classes="{ active: isActive('label') }">Label</b-nav-item>
          <b-nav-item :to="{ name: 'stores' }" :link-classes="{ active: isActive('store') }">Store</b-nav-item>
          <b-nav-item :to="{ name: 'bookmarks' }" :link-classes="{ active: isActive('bookmark') }">Bookmark</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="d-none d-md-block">
          <b-nav-item-dropdown>
            <template slot="button-content">
              <fa icon="ellipsis-h" fixed-width />
            </template>
            <b-dropdown-item :to="{ name: 'about' }">About</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'privacy' }">Privacy</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'contact' }">Contact</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'third-party-licenses' }">Third-Party Licenses</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto d-md-none">
          <b-nav-item :to="{ name: 'about' }" :link-classes="{ active: isActive('about') }">About</b-nav-item>
          <b-nav-item :to="{ name: 'privacy' }" :link-classes="{ active: isActive('privacy') }">Privacy</b-nav-item>
          <b-nav-item :to="{ name: 'contact' }" :link-classes="{ active: isActive('contact') }">Contact</b-nav-item>
          <b-nav-item :to="{ name: 'third-party-licenses' }" :link-classes="{ active: isActive('third-party-licenses') }">Third-Party Licenses</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto d-none d-lg-block">
          <SearchForm v-if="showSearchForm()" />
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
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
    isActive (value) {
      const routeName = this.$route.name || ''
      return routeName.includes(value)
    },
    showSearchForm () {
      return [
        'tracks',
        'tracks-search',
        'labels',
        'labels-search',
        'stores',
        'stores-search',
        'bookmarks',
        'bookmarks-search'
      ].includes(this.$route.name || '')
    }
  }
}
</script>
