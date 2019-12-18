import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import storeTracking from '~/store/tracking'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('store: tracking', () => {
  const tracking = cloneDeep(storeTracking)
  tracking.namespaced = true

  let store

  beforeEach(() => {
    store = new Vuex.Store({ modules: { tracking } })
  })

  test('state: default values', () => {
    expect(store.state.tracking.disable).toBe(true)
  })

  test('actions: disable', () => {
    store.dispatch('tracking/disable')
    expect(store.state.tracking.disable).toBe(true)
  })

  test('actions: enable', () => {
    store.dispatch('tracking/enable')
    expect(store.state.tracking.disable).toBe(false)
  })
})
