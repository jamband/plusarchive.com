import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import storeTrack from '~/store/track'
import storePlaylist from '~/store/playlist'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const track = cloneDeep(storeTrack)
track.namespaced = true

const playlist = cloneDeep(storePlaylist)
playlist.namespaced = true

const player = cloneDeep(storePlayer)
player.namespaced = true

let store, fixture

beforeEach(() => {
  store = new Vuex.Store({ modules: { track, playlist, player } })

  fixture = {}
  fixture.track = {
    id: 'id1',
    title: 'track1',
    provider: 'provider1',
    provider_key: 'key1',
    type: 'track'
  }
  fixture.playlist = {
    id: 'id1',
    title: 'playlist1',
    provider: 'provider1',
    provider_key: 'key1',
    type: 'playlist'
  }
  fixture.player = {
    id: 'id1',
    title: 'track1',
    provider: 'provider1',
    type: 'track',
    src: 'src1'
  }

  store.$app = {
    color: {
      primary: 'fff'
    }
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
  fixture.track.provider = 'Bandcamp'
  store.commit('track/setItem', fixture.track)
  store.dispatch('player/fetchItem', { type: 'track' })

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('Bandcamp')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toContain('https://bandcamp.com/EmbeddedPlayer/track=key1/')
})

test('actions: fetchItem when { provider: "SoundCloud", type: "track" }', () => {
  fixture.track.provider = 'SoundCloud'
  store.commit('track/setItem', fixture.track)
  store.dispatch('player/fetchItem', { type: 'track' })

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('SoundCloud')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toContain('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/key1')
})

test('actions: fetchItem when { provider: "SoundCloud", type: "playlist" }', () => {
  fixture.playlist.provider = 'SoundCloud'
  store.commit('playlist/setItem', fixture.playlist)
  store.dispatch('player/fetchItem', { type: 'playlist' })

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('playlist1')
  expect(store.state.player.provider).toBe('SoundCloud')
  expect(store.state.player.type).toBe('playlist')
  expect(store.state.player.src)
    .toContain('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/key1')
})

test('actions: fetchItem when { provider: "Vimeo", type: "track" }', () => {
  fixture.track.provider = 'Vimeo'
  store.commit('track/setItem', fixture.track)
  store.dispatch('player/fetchItem', { type: 'track' })

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('Vimeo')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toBe('https://player.vimeo.com/video/key1')
})

test('actions: fetchItem when { provider: "YouTube", type: "track" }', () => {
  fixture.track.provider = 'YouTube'
  store.commit('track/setItem', fixture.track)
  store.dispatch('player/fetchItem', { type: 'track' })

  expect(store.state.player.id).toBe('id1')
  expect(store.state.player.title).toBe('track1')
  expect(store.state.player.provider).toBe('YouTube')
  expect(store.state.player.type).toBe('track')
  expect(store.state.player.src)
    .toContain('https://www.youtube.com/embed/key1')
})

test('actions: fetchItem when { provider: "YouTube", type: "playlist" }', () => {
  fixture.playlist.provider = 'YouTube'
  store.commit('playlist/setItem', fixture.playlist)
  store.dispatch('player/fetchItem', { type: 'playlist' })

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
  store.commit('player/setItem', fixture.player)
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
