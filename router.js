import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function interopDefault (promise) {
  return promise.then(m => m.default || m)
}

export function createRouter () {
  return new Router({
    mode: 'history',
    linkActiveClass: '',
    linkExactActiveClass: '',
    routes: [
      // home
      {
        name: 'home',
        path: '/',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/index' /* webpackChunkName: "pages/index" */))
      },

      // tracks
      {
        name: 'tracks',
        path: '/tracks',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/tracks' /* webpackChunkName: "pages/tracks" */))
      },
      {
        name: 'tracks-search',
        path: '/tracks/search',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/tracks' /* webpackChunkName: "pages/tracks" */))
      },
      {
        name: 'track',
        path: '/track/:id([\\w-]{11})',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/track' /* webpackChunkName: "pages/track" */))
      },

      // plalists
      {
        name: 'playlists',
        path: '/playlists',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/playlists' /* webpackChunkName: "pages/playlists" */))
      },
      {
        name: 'playlist',
        path: '/playlist/:id([\\w-]{11})',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/playlist' /* webpackChunkName: "pages/playlist" */))
      },

      // labels
      {
        name: 'labels',
        path: '/labels',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/labels' /* webpackChunkName: "pages/labels" */))
      },
      {
        name: 'labels-search',
        path: '/labels/search',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/labels' /* webpackChunkName: "pages/labels" */))
      },

      // stores
      {
        name: 'stores',
        path: '/stores',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/stores' /* webpackChunkName: "pages/stores" */))
      },
      {
        name: 'stores-search',
        path: '/stores/search',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/stores' /* webpackChunkName: "pages/stores" */))
      },

      // bookmarks
      {
        name: 'bookmarks',
        path: '/bookmarks',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/bookmarks' /* webpackChunkName: "pages/bookmarks" */))
      },
      {
        name: 'bookmarks-search',
        path: '/bookmarks/search',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/bookmarks' /* webpackChunkName: "pages/bookmarks" */))
      },

      // ...
      {
        name: 'about',
        path: '/about',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/about' /* webpackChunkName: "pages/about" */))
      },
      {
        name: 'contact',
        path: '/contact',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/contact' /* webpackChunkName: "pages/contact" */))
      },
      {
        name: 'privacy',
        path: '/privacy',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/privacy' /* webpackChunkName: "pages/privacy" */))
      },
      {
        name: 'third-party-licenses',
        path: '/third-party-licenses',
        pathToRegexpOptions: { strict: true },
        component: () => interopDefault(import('~/pages/third-party-licenses' /* webpackChunkName: "pages/third-party-licenses" */))
      }
    ]
  })
}
