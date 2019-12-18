import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import Tracks from '~/pages/tracks'
import Track from '~/pages/track'
import Playlists from '~/pages/playlists'
import Playlist from '~/pages/playlist'
import Labels from '~/pages/labels'
import Stores from '~/pages/stores'
import Bookmarks from '~/pages/bookmarks'
import About from '~/pages/about'
import Contact from '~/pages/contact'
import Privacy from '~/pages/privacy'
import ThirdPartyLicenses from '~/pages/third-party-licenses'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    linkActiveClass: '',
    linkExactActiveClass: '',
    routes: [
      { name: 'home', path: '/', component: Home },
      { name: 'tracks', path: '/tracks', component: Tracks },
      { name: 'track', path: '/track/:id([\\w-]{11})', component: Track },
      { name: 'playlists', path: '/playlists', component: Playlists },
      { name: 'playlist', path: '/playlist/:id([\\w-]{11})', component: Playlist },
      { name: 'labels', path: '/labels', component: Labels },
      { name: 'stores', path: '/stores', component: Stores },
      { name: 'bookmarks', path: '/bookmarks', component: Bookmarks },
      { name: 'about', path: '/about', component: About },
      { name: 'contact', path: '/contact', component: Contact },
      { name: 'privacy', path: '/privacy', component: Privacy },
      { name: 'third-party-licenses', path: '/third-party-licenses', component: ThirdPartyLicenses }
    ]
  })
}
