import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import storeTracking from '~/store/tracking'
import TheFooterTracking from '~/components/TheFooterTracking'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(pluginFontAwesome)

const factory = (store = {}) => {
  return mount(TheFooterTracking, {
    localVue,
    store,
    stubs: {
      NLink: RouterLinkStub
    },
    mocks: {
      $ga: { enable () {} }
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

test('text link', () => {
  const a = wrapper.find('a')
  expect(a.text()).toBe('Privacy Policy')
})

test('optIn', () => {
  const button = wrapper.find('button')
  const tracking = wrapper.vm.$store.state.tracking
  expect(tracking.disable).toBe(true)

  button.trigger('click')
  expect(tracking.disable).toBe(false)
})
