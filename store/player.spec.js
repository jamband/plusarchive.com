import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { klona } from 'klona'
import storePlayer from './player'

const localVue = createLocalVue()

localVue.use(Vuex)

const player = klona(storePlayer)
player.namespaced = true

let store, item

beforeEach(() => {
  store = new Store({ modules: { player } })

  item = {}
  item.track = {
    id: 'id1',
    title: 'track1',
    provider: 'provider1',
    provider_key: 'key1',
    type: 'track'
  }
  item.playlist = {
    id: 'id1',
    title: 'playlist1',
    provider: 'provider1',
    provider_key: 'key1',
    type: 'playlist'
  }
  item.player = {
    id: 'id1',
    title: 'track1',
    provider: 'provider1',
    type: 'track',
    src: 'src1'
  }
})

test('state: default values', () => {
  expect(store.state.player.loading).toBe(false)
  expect(store.state.player.id).toBe('')
  expect(store.state.player.title).toBe('')
  expect(store.state.player.provider).toBe('')
  expect(store.state.player.type).toBe('')
  expect(store.state.player.src).toBe('')
})

test('actions: fetchItem when { provider: "Bandcamp", type: "track" }', () => {
  item.track.provider = 'Bandcamp'
  store.dispatch('player/fetchItem', item.track)

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('Bandcamp')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toContain('https://bandcamp.com/EmbeddedPlayer/track=key1/')
})

test('actions: fetchItem when { provider: "SoundCloud", type: "track" }', () => {
  item.track.provider = 'SoundCloud'
  store.dispatch('player/fetchItem', item.track)

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('SoundCloud')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toContain('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/key1')
})

test('actions: fetchItem when { provider: "SoundCloud", type: "playlist" }', () => {
  item.playlist.provider = 'SoundCloud'
  store.dispatch('player/fetchItem', item.playlist)

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('playlist1')
  expect(store.state.player.provider).toBe('SoundCloud')
  expect(store.state.player.type).toBe('playlist')
  expect(store.state.player.src)
    .toContain('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/key1')
})

test('actions: fetchItem when { provider: "Vimeo", type: "track" }', () => {
  item.track.provider = 'Vimeo'
  store.dispatch('player/fetchItem', item.track)

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('Vimeo')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toBe('https://player.vimeo.com/video/key1')
})

test('actions: fetchItem when { provider: "YouTube", type: "track" }', () => {
  item.track.provider = 'YouTube'
  store.dispatch('player/fetchItem', item.track)

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('YouTube')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toContain('https://www.youtube.com/embed/key1')
})

test('actions: fetchItem when { provider: "YouTube", type: "playlist" }', () => {
  item.playlist.provider = 'YouTube'
  store.dispatch('player/fetchItem', item.playlist)

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('playlist1')
  expect(store.state.player.provider).toBe('YouTube')
  expect(store.state.player.type).toBe('playlist')
  expect(store.state.player.src)
    .toContain('https://www.youtube.com/embed/videoseries?list=key1')
})

test('actions: loading', () => {
  store.dispatch('player/loading', { status: true })
  expect(store.state.player.loading).toBe(true)

  store.dispatch('player/loading', { status: false })
  expect(store.state.player.loading).toBe(false)
})

test('actions: clear', () => {
  store.commit('player/setItem', item.player)
  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('provider1')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src).toBe('src1')

  store.dispatch('player/clear')
  expect(store.state.player.id).toBe('')
  expect(store.state.player.title).toBe('')
  expect(store.state.player.provider).toBe('')
  expect(store.state.player.type).toBe('')
  expect(store.state.player.src).toBe('')
})
