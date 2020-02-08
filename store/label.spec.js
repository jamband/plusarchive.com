import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'
import storePagination from '~/store/pagination'
import storeLabel from '~/store/label'

const localVue = createLocalVue()

localVue.use(Vuex)

let mockResponse
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockResponse))
}))

const pagination = cloneDeep(storePagination)
pagination.namespaced = true

const label = cloneDeep(storeLabel)
label.namespaced = true

let store

beforeEach(() => {
  store = new Vuex.Store({ modules: { pagination, label } })
  store.$axios = axios
})

test('state: default values', () => {
  expect(store.state.label.items).toEqual([])
  expect(store.state.label.item).toEqual({})
  expect(store.state.label.countries).toEqual([])
  expect(store.state.label.tags).toEqual([])
})

test('actions: fetchItems', async () => {
  mockResponse = {
    items: [
      { name: 'label1', country: 'country1', url: 'url1', link: 'link1' },
      { name: 'label2', country: 'country2', url: 'url2', link: 'link2' },
      { name: 'label3', country: 'country3', url: 'url3', link: 'link3' }
    ],
    _meta: {
      totalCount: 3,
      pageCount: 1,
      currentPage: 1
    }
  }
  expect(store.state.label.items.length).toBe(0)

  await store.dispatch('label/fetchItems', { query: {} })
  expect(store.state.label.items.length).toBe(3)
  expect(store.state.label.items[0].name).toBe('label1')
  expect(store.state.label.items[1].name).toBe('label2')
  expect(store.state.label.items[2].name).toBe('label3')

  expect(store.state.pagination.totalCount).toBe(3)
  expect(store.state.pagination.pageCount).toBe(1)
  expect(store.state.pagination.currentPage).toBe(1)
})

test('actions: fetchCountriesAndTags', async () => {
  mockResponse = {
    countries: ['country1', 'country2'],
    tags: ['tag1', 'tag2', 'tag3']
  }
  expect(store.state.label.countries.length).toBe(0)

  await store.dispatch('label/fetchCountriesAndTags', { error: {} })
  expect(store.state.label.countries.length).toBe(2)
  expect(store.state.label.countries[0]).toBe('country1')
  expect(store.state.label.countries[1]).toBe('country2')

  expect(store.state.label.tags.length).toBe(3)
  expect(store.state.label.tags[0]).toBe('tag1')
  expect(store.state.label.tags[1]).toBe('tag2')
  expect(store.state.label.tags[2]).toBe('tag3')
})
