import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { mount, createLocalVue } from '@vue/test-utils'
import storeTracking from '~/store/tracking'
import PagePrivacy from '~/pages/privacy'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(pluginFontAwesome)

const factory = (store = {}) => {
  return mount(PagePrivacy, {
    store,
    localVue,
    mocks: {
      $ga: {
        disable () {}
      }
    }
  })
}

const tracking = cloneDeep(storeTracking)
tracking.namespaced = true

let wrapper

beforeEach(() => {
  const store = new Vuex.Store({ modules: { tracking } })
  wrapper = factory(store)
})

test('is visible', () => {
  expect(wrapper.text()).toContain('Privacy')
})

test('optOut', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {})

  wrapper.findAll('a').at(1).trigger('click.prevent')
  expect(window.alert).toHaveBeenCalledWith('Google Analytics is not yet loaded.')

  wrapper.vm.$store.commit('tracking/enable')
  expect(wrapper.vm.$store.state.tracking.disable).toBe(false)

  wrapper.findAll('a').at(1).trigger('click.prevent')
  expect(window.alert).toHaveBeenCalledWith('Opt-Out has been complete.')
  expect(wrapper.vm.$store.state.tracking.disable).toBe(true)
})
