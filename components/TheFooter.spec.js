import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import pluginApp from '~/plugins/app'
import pluginFontAwesome from '~/plugins/fontawesome'
import TheFooter from '~/components/TheFooter'
import storeTracking from '~/store/tracking'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(pluginApp)
localVue.use(pluginFontAwesome)

const factory = (store = {}, route = {}) => {
  return mount(TheFooter, {
    localVue,
    store,
    stubs: {
      NLink: RouterLinkStub
    },
    mocks: {
      $route: route
    }
  })
}

const tracking = cloneDeep(storeTracking)
tracking.namespaced = true

const player = cloneDeep(storePlayer)
player.namespaced = true

let store, fixture

beforeEach(() => {
  store = new Vuex.Store({ modules: { tracking, player } })

  fixture = {}
  fixture.player = {
    id: 'id1',
    title: 'title1',
    provider: 'provider1',
    type: 'track',
    src: 'src1'
  }
})

// title: '', tracking: false
test('text when { title: "", tracking: false, route: "home" }', () => {
  const wrapper = factory(store, { name: 'home' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "tracks" }', () => {
  const wrapper = factory(store, { name: 'tracks' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "track" }', () => {
  const wrapper = factory(store, { name: 'track' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "playlists" }', () => {
  const wrapper = factory(store, { name: 'playlists' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "playlist" }', () => {
  const wrapper = factory(store, { name: 'playlist' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "labels" }', () => {
  const wrapper = factory(store, { name: 'labels' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "stores" }', () => {
  const wrapper = factory(store, { name: 'stores' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "bookmarks" }', () => {
  const wrapper = factory(store, { name: 'bookmarks' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "about" }', () => {
  const wrapper = factory(store, { name: 'about' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "privacy" }', () => {
  const wrapper = factory(store, { name: 'privacy' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "contact" }', () => {
  const wrapper = factory(store, { name: 'contact' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "", tracking: false, route: "third-party-licenses" }', () => {
  const wrapper = factory(store, { name: 'third-party-licenses' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

// title: '', tracking: true
test('text when { title: "", tracking: true, route: "home" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'home' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "tracks" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'tracks' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: false, route: "track" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'track' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "playlists" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'playlists' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "playlist" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'playlist' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "labels" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'labels' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "stores" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'stores' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "bookmarks" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'bookmarks' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "about" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'about' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "privacy" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'privacy' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "contact" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'contact' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "", tracking: true, route: "third-party-licenses" }', () => {
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'third-party-licenses' })
  expect(wrapper.text()).toBe('PlusArchive')
})

// title: 'something', tracking: false
test('text when { title: "something", tracking: false, route: "home" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'home' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "tracks" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'tracks' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "track" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'track' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "something", tracking: false, route: "playlists" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'playlists' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "playlist" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'playlist' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "something", tracking: false, route: "labels" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'labels' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "stores" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'stores' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "bookmarks" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'bookmarks' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "about" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'about' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "privacy" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'privacy' })
  expect(wrapper.text()).toContain('I ACCEPT')
})

test('text when { title: "something", tracking: false, route: "contact" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'contact' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: false, route: "third-party-licenses" }', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'third-party-licenses' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

// title: 'something', tracking: true
test('text when { title: "something", tracking: true, route: "home" }', () => {
  store.commit('tracking/enable')
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store, { name: 'home' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "tracks" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'tracks' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "track" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'track' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "playlists" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'playlists' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "playlist" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'playlist' })
  expect(wrapper.text()).toBe('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "labels" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'labels' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "stores" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'stores' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "bookmarks" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'bookmarks' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "about" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'about' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "privacy" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'privacy' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "contact" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'contact' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})

test('text when { title: "something", tracking: true, route: "third-party-licenses" }', () => {
  store.commit('player/setItem', fixture.player)
  store.commit('tracking/enable')
  const wrapper = factory(store, { name: 'third-party-licenses' })
  expect(wrapper.text()).toContain('title1')
  expect(wrapper.text()).toContain('PlusArchive')
})
