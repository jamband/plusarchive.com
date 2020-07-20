import Vuex from 'vuex'
import klona from 'klona'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import storeTracking from '~/store/tracking'
import PagePrivacy from '~/pages/privacy'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (store = {}) => {
  return shallowMount(PagePrivacy, {
    store,
    localVue,
    stubs: {
      fa: true
    },
    mocks: {
      $ga: {
        disable: jest.fn()
      }
    }
  })
}

const tracking = klona(storeTracking)
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
  const button = wrapper.find('button')

  button.trigger('click')
  expect(window.alert).toHaveBeenCalledWith('Google Analytics is not yet loaded.')

  wrapper.vm.$store.commit('tracking/enable')
  expect(wrapper.vm.$store.state.tracking.disable).toBe(false)

  button.trigger('click')
  expect(window.alert).toHaveBeenCalledWith('Opt-Out has been complete.')
  expect(wrapper.vm.$store.state.tracking.disable).toBe(true)
})
