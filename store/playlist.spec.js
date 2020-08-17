import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { klona } from 'klona'
import axios from 'axios'
import storePlaylist from '~/store/playlist'

const localVue = createLocalVue()

localVue.use(Vuex)

let mockResponse
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockResponse))
}))

const playlist = klona(storePlaylist)
playlist.namespaced = true

let store

beforeEach(() => {
  store = new Vuex.Store({ modules: { playlist } })
  store.$axios = axios
})

test('state: default values', () => {
  expect(store.state.playlist.items).toEqual([])
  expect(store.state.playlist.item).toEqual({})
})

test('actions: fetchItems', async () => {
  mockResponse = {
    items: [
      { id: 'id1', url: 'url1', provider: 'provider1', provider_key: 'key1', title: 'playlist1' },
      { id: 'id2', url: 'url2', provider: 'provider2', provider_key: 'key2', title: 'playlist2' },
      { id: 'id3', url: 'url3', provider: 'provider3', provider_key: 'key3', title: 'playlist3' }
    ]
  }
  expect(store.state.playlist.items.length).toBe(0)

  await store.dispatch('playlist/fetchItems', { error: {} })
  expect(store.state.playlist.items.length).toBe(3)
  expect(store.state.playlist.items[0].title).toBe('playlist1')
  expect(store.state.playlist.items[1].title).toBe('playlist2')
  expect(store.state.playlist.items[2].title).toBe('playlist3')
})

test('actions: fetchItem', async () => {
  mockResponse = {
    id: 'id1', url: 'url1', provider: 'provider1', provider_key: 'key1', title: 'playlist1'
  }
  expect(store.state.playlist.item).toEqual({})

  await store.dispatch('playlist/fetchItem', { id: 'id1' })
  expect(store.state.playlist.item).not.toEqual({})
  expect(store.state.playlist.item.title).toBe('playlist1')
})
