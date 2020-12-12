import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { klona } from 'klona'
import storePagination from '~/store/pagination'

const localVue = createLocalVue()

localVue.use(Vuex)

const pagination = klona(storePagination)
pagination.namespaced = true

let store

beforeEach(() => {
  store = new Vuex.Store({ modules: { pagination } })
})

test('state: default values', () => {
  expect(store.state.pagination.totalCount).toBe(0)
  expect(store.state.pagination.pageCount).toBe(0)
  expect(store.state.pagination.currentPage).toBe(0)
})

test('mutations: setItem', () => {
  store.commit('pagination/setItem', {
    totalCount: 100,
    pageCount: 10,
    currentPage: 1
  })
  expect(store.state.pagination.totalCount).toBe(100)
  expect(store.state.pagination.pageCount).toBe(10)
  expect(store.state.pagination.currentPage).toBe(1)
})
