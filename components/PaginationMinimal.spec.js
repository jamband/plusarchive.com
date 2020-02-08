import Vuex from 'vuex'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import storePagination from '~/store/pagination'
import PaginationMinimal from '~/components/PaginationMinimal'
import pluginScroll from '~/plugins/scroll'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(pluginFontAwesome)
localVue.use(pluginScroll)

const factory = (store = {}) => {
  return mount(PaginationMinimal, {
    store,
    localVue,
    stubs: {
      NLink: RouterLinkStub
    },
    mocks: {
      $route: { query: '' }
    }
  })
}

const pagination = cloneDeep(storePagination)
pagination.namespaced = true

let store

beforeEach(() => {
  store = new Vuex.Store({ modules: { pagination } })
})

test('dont have page', () => {
  const wrapper = factory(store)
  expect(wrapper.html()).toBe('')
})

test('current page: first', () => {
  store.commit('pagination/setMeta', {
    totalCount: 100,
    pageCount: 10,
    currentPage: 1
  })

  const wrapper = factory(store)
  const li = wrapper.findAll('ul > li')

  expect(li.at(0).classes()).toContain('disabled')
  expect(li.at(1).classes()).toContain('disabled')
  expect(li.at(2).classes()).not.toContain('disabled')
  expect(li.at(3).classes()).not.toContain('disabled')

  expect(li.at(0).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(1).find(RouterLinkStub).props().to).toEqual({ query: { page: 0 } })
  expect(li.at(2).find(RouterLinkStub).props().to).toEqual({ query: { page: 2 } })
  expect(li.at(3).find(RouterLinkStub).props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.info').text()).toBe('1/10')
})

test('current page: second', () => {
  store.commit('pagination/setMeta', {
    totalCount: 100,
    pageCount: 10,
    currentPage: 2
  })

  const wrapper = factory(store)
  const li = wrapper.findAll('ul > li')

  expect(li.at(0).classes()).not.toContain('disabled')
  expect(li.at(1).classes()).not.toContain('disabled')
  expect(li.at(2).classes()).not.toContain('disabled')
  expect(li.at(3).classes()).not.toContain('disabled')

  expect(li.at(0).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(1).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(2).find(RouterLinkStub).props().to).toEqual({ query: { page: 3 } })
  expect(li.at(3).find(RouterLinkStub).props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.info').text()).toBe('2/10')
})

test('current page: last', () => {
  store.commit('pagination/setMeta', {
    totalCount: 100,
    pageCount: 10,
    currentPage: 10
  })

  const wrapper = factory(store)
  const li = wrapper.findAll('ul > li')

  expect(li.at(0).classes()).not.toContain('disabled')
  expect(li.at(1).classes()).not.toContain('disabled')
  expect(li.at(2).classes()).toContain('disabled')
  expect(li.at(3).classes()).toContain('disabled')

  expect(li.at(0).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(1).find(RouterLinkStub).props().to).toEqual({ query: { page: 9 } })
  expect(li.at(2).find(RouterLinkStub).props().to).toEqual({ query: { page: 11 } })
  expect(li.at(3).find(RouterLinkStub).props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.info').text()).toBe('10/10')
})
