import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'
import storePagination from '~/store/pagination'
import storeStore from '~/store/store'

const localVue = createLocalVue()

localVue.use(Vuex)

let mockResponse
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockResponse))
}))

const pagination = cloneDeep(storePagination)
pagination.namespaced = true

const storeModule = cloneDeep(storeStore)
storeModule.namespaced = true

let store

beforeEach(() => {
  store = new Vuex.Store({ modules: { pagination, store: storeModule } })
  store.$axios = axios
})

test('state: default values', () => {
  expect(store.state.store.items).toEqual([])
  expect(store.state.store.item).toEqual({})
  expect(store.state.store.countries).toEqual([])
  expect(store.state.store.tags).toEqual([])
})

test('actions: fetchItems', async () => {
  mockResponse = {
    items: [
      { name: 'store1', country: 'country1', url: 'url1', link: 'link1' },
      { name: 'store2', country: 'country2', url: 'url2', link: 'link2' },
      { name: 'store3', country: 'country3', url: 'url3', link: 'link3' }
    ],
    _meta: {
      totalCount: 3,
      pageCount: 1,
      currentPage: 1
    }
  }
  expect(store.state.store.items.length).toBe(0)

  await store.dispatch('store/fetchItems', { query: {} })
  expect(store.state.store.items.length).toBe(3)
  expect(store.state.store.items[0].name).toBe('store1')
  expect(store.state.store.items[1].name).toBe('store2')
  expect(store.state.store.items[2].name).toBe('store3')

  expect(store.state.pagination.totalCount).toBe(3)
  expect(store.state.pagination.pageCount).toBe(1)
  expect(store.state.pagination.currentPage).toBe(1)
})

test('actions: fetchCountriesAndTags', async () => {
  mockResponse = {
    countries: ['country1', 'country2'],
    tags: ['tag1', 'tag2', 'tag3']
  }
  expect(store.state.store.countries.length).toBe(0)

  await store.dispatch('store/fetchCountriesAndTags', { error: {} })
  expect(store.state.store.countries.length).toBe(2)
  expect(store.state.store.countries[0]).toBe('country1')
  expect(store.state.store.countries[1]).toBe('country2')

  expect(store.state.store.tags.length).toBe(3)
  expect(store.state.store.tags[0]).toBe('tag1')
  expect(store.state.store.tags[1]).toBe('tag2')
  expect(store.state.store.tags[2]).toBe('tag3')
})
