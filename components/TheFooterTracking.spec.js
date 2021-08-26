import Vuex, { Store } from 'vuex'
import { klona } from 'klona'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import TheFooterTracking from './TheFooterTracking'
import storeTracking from '~/store/tracking'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (store = {}) => {
  return shallowMount(TheFooterTracking, {
    localVue,
    store,
    stubs: {
      fa: true,
      NLink: RouterLinkStub
    },
    mocks: {
      $gtag: {
        optIn: () => jest.fn()
      }
    }
  })
}

const tracking = klona(storeTracking)
tracking.namespaced = true

let wrapper

beforeEach(() => {
  const store = new Store({ modules: { tracking } })
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
