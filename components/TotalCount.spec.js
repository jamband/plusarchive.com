import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import storePagination from '~/store/pagination'
import TotalCount from '~/components/TotalCount'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (store = {}) => {
  return mount(TotalCount, {
    store,
    localVue
  })
}

describe('components: TotalCount', () => {
  const pagination = cloneDeep(storePagination)
  pagination.namespaced = true

  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { pagination } })
  })

  test('case: 0', () => {
    const wrapper = factory(store)
    expect(wrapper.text()).toBe('No results found')
  })

  test('case: 100', () => {
    store.commit('pagination/setMeta', {
      totalCount: 100
    })
    const wrapper = factory(store)
    expect(wrapper.text()).toBe('100 results')
  })
})
