import Vuex from 'vuex'
import { klona } from 'klona'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import PrivacyPage from './privacy'
import storeTracking from '~/store/tracking'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (store = {}) => {
  return shallowMount(PrivacyPage, {
    store,
    localVue,
    stubs: {
      fa: true
    },
    mocks: {
      $gtag: {
        optOut: () => jest.fn()
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
  expect(window.alert).toHaveBeenCalledWith('Google Analytics tracking is not yet enabled.')

  wrapper.vm.$store.commit('tracking/enable')
  expect(wrapper.vm.$store.state.tracking.disable).toBe(false)

  button.trigger('click')
  expect(window.alert).toHaveBeenCalledWith('Opt-Out has been complete.')
  expect(wrapper.vm.$store.state.tracking.disable).toBe(true)
})
