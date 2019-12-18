import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'
import storePagination from '~/store/pagination'
import storeTrack from '~/store/track'

const localVue = createLocalVue()

localVue.use(Vuex)

let mockResponse
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockResponse))
}))

describe('store: track', () => {
  const pagination = cloneDeep(storePagination)
  pagination.namespaced = true

  const track = cloneDeep(storeTrack)
  track.namespaced = true

  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { pagination, track } })
    store.$axios = axios
  })

  test('state: default values', () => {
    expect(store.state.track.items).toEqual([])
    expect(store.state.track.item).toEqual({})
    expect(store.state.track.genres).toEqual([])
    expect(store.state.track.favorites).toEqual([])
    expect(store.state.track.minimalGenres).toEqual([])
  })

  test('actions: fetchItems', async () => {
    mockResponse = {
      items: [
        { id: 'id1', url: 'url1', provider: 'provider1', provider_key: 'key1', title: 'track1', image: 'image1', created_at: '2020.07.24' },
        { id: 'id2', url: 'url2', provider: 'provider2', provider_key: 'key2', title: 'track2', image: 'image2', created_at: '2020.07.25' },
        { id: 'id3', url: 'url3', provider: 'provider3', provider_key: 'key3', title: 'track3', image: 'image3', created_at: '2021.07.26' }
      ],
      _meta: {
        totalCount: 3,
        pageCount: 1,
        currentPage: 1
      }
    }
    expect(store.state.track.items.length).toBe(0)

    await store.dispatch('track/fetchItems', { query: {} })
    expect(store.state.track.items.length).toBe(3)
    expect(store.state.track.items[0].title).toBe('track1')
    expect(store.state.track.items[1].title).toBe('track2')
    expect(store.state.track.items[2].title).toBe('track3')

    expect(store.state.pagination.totalCount).toBe(3)
    expect(store.state.pagination.pageCount).toBe(1)
    expect(store.state.pagination.currentPage).toBe(1)
  })

  test('actions: fetchItem', async () => {
    mockResponse = {
      id: 'id1', url: 'url1', provider: 'provider1', provider_key: 'key1', title: 'track1', image: 'image1', created_at: '2020.07.24'
    }
    expect(store.state.track.item).toEqual({})

    await store.dispatch('track/fetchItem', { id: 'id1' })
    expect(store.state.track.item).not.toEqual({})
    expect(store.state.track.item.title).toBe('track1')
  })

  test('actions: fetchGenres', async () => {
    mockResponse = {
      genres: ['genre1', 'genre2', 'genre3']
    }
    expect(store.state.track.genres.length).toBe(0)

    await store.dispatch('track/fetchGenres', { error: {} })
    expect(store.state.track.genres.length).toBe(3)
    expect(store.state.track.genres[0]).toBe('genre1')
    expect(store.state.track.genres[1]).toBe('genre2')
    expect(store.state.track.genres[2]).toBe('genre3')
  })

  test('actions: fetchFavorites', async () => {
    mockResponse = {
      items: [
        { id: 'id1', url: 'url1', provider: 'provider1', provider_key: 'key1', title: 'fav1', image: 'image1', created_at: '2020.07.24' },
        { id: 'id2', url: 'url2', provider: 'provider2', provider_key: 'key2', title: 'fav2', image: 'image2', created_at: '2020.07.25' },
        { id: 'id3', url: 'url3', provider: 'provider3', provider_key: 'key3', title: 'fav3', image: 'image3', created_at: '2021.07.26' }
      ]
    }
    expect(store.state.track.favorites.length).toBe(0)

    await store.dispatch('track/fetchFavorites', { error: {} })
    expect(store.state.track.favorites.length).toBe(3)
    expect(store.state.track.favorites[0].title).toBe('fav1')
    expect(store.state.track.favorites[1].title).toBe('fav2')
    expect(store.state.track.favorites[2].title).toBe('fav3')
  })

  test('actions: fetchMinimalGenres', async () => {
    mockResponse = ['minimal1', 'minimal2', 'minimal3']
    expect(store.state.track.minimalGenres.length).toBe(0)

    await store.dispatch('track/fetchMinimalGenres', { error: {} })
    expect(store.state.track.minimalGenres.length).toBe(3)
    expect(store.state.track.minimalGenres[0]).toBe('minimal1')
    expect(store.state.track.minimalGenres[1]).toBe('minimal2')
    expect(store.state.track.minimalGenres[2]).toBe('minimal3')
  })
})
