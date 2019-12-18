import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'
import storePagination from '~/store/pagination'
import storeBookmark from '~/store/bookmark'

const localVue = createLocalVue()

localVue.use(Vuex)

let mockResponse
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockResponse))
}))

describe('store: bookmark', () => {
  const pagination = cloneDeep(storePagination)
  pagination.namespaced = true

  const bookmark = cloneDeep(storeBookmark)
  bookmark.namespaced = true

  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { pagination, bookmark } })
    store.$axios = axios
  })

  test('state: default values', () => {
    expect(store.state.bookmark.items).toEqual([])
    expect(store.state.bookmark.item).toEqual({})
    expect(store.state.bookmark.countries).toEqual([])
    expect(store.state.bookmark.tags).toEqual([])
  })

  test('actions: fetchItems', async () => {
    mockResponse = {
      items: [
        { name: 'bookmark1', country: 'country1', url: 'url1', link: 'link1' },
        { name: 'bookmark2', country: 'country2', url: 'url2', link: 'link2' },
        { name: 'bookmark3', country: 'country3', url: 'url3', link: 'link3' }
      ],
      _meta: {
        totalCount: 3,
        pageCount: 1,
        currentPage: 1
      }
    }
    expect(store.state.bookmark.items.length).toBe(0)

    await store.dispatch('bookmark/fetchItems', { query: {} })
    expect(store.state.bookmark.items.length).toBe(3)
    expect(store.state.bookmark.items[0].name).toBe('bookmark1')
    expect(store.state.bookmark.items[1].name).toBe('bookmark2')
    expect(store.state.bookmark.items[2].name).toBe('bookmark3')

    expect(store.state.pagination.totalCount).toBe(3)
    expect(store.state.pagination.pageCount).toBe(1)
    expect(store.state.pagination.currentPage).toBe(1)
  })

  test('actions: fetchCountriesAndTags', async () => {
    mockResponse = {
      countries: ['country1', 'country2'],
      tags: ['tag1', 'tag2', 'tag3']
    }
    expect(store.state.bookmark.countries.length).toBe(0)

    await store.dispatch('bookmark/fetchCountriesAndTags', { error: {} })
    expect(store.state.bookmark.countries.length).toBe(2)
    expect(store.state.bookmark.countries[0]).toBe('country1')
    expect(store.state.bookmark.countries[1]).toBe('country2')

    expect(store.state.bookmark.tags.length).toBe(3)
    expect(store.state.bookmark.tags[0]).toBe('tag1')
    expect(store.state.bookmark.tags[1]).toBe('tag2')
    expect(store.state.bookmark.tags[2]).toBe('tag3')
  })
})
