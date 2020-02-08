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

test('text links', () => {
  const a = wrapper.findAll('a')
  expect(a.length).toBe(2)
  expect(a.at(0).text()).toBe('I ACCEPT')
  expect(a.at(1).text()).toBe('Privacy Policy')
})

test('optIn', () => {
  const a = wrapper.findAll('a')
  const tracking = wrapper.vm.$store.state.tracking
  expect(tracking.disable).toBe(true)

  a.at(0).trigger('click.prevent')
  expect(tracking.disable).toBe(false)
})
