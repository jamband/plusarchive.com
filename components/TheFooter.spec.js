import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import { klona } from 'klona'
import TheFooter from '~/components/TheFooter'
import { APP_NAME } from '~/constants/app'
import storeTracking from '~/store/tracking'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = ({ store, route }) => {
  return shallowMount(TheFooter, {
    localVue,
    store,
    stubs: {
      fa: true,
      NLink: RouterLinkStub,
      TheFooterPlayerTitle: true,
      TheFooterTracking: true
    },
    mocks: {
      $route: route
    }
  })
}

const tracking = klona(storeTracking)
tracking.namespaced = true

const player = klona(storePlayer)
player.namespaced = true

let store, fixture

beforeEach(() => {
  store = new Vuex.Store({ modules: { tracking, player } })

  fixture = {}
  fixture.player = {
    id: 'id1',
    title: 'title1',
    provider: 'provider1',
    type: 'track',
    src: 'src1'
  }
})

const routes = [
  'home',
  'tracks',
  'track',
  'playlists',
  'playlist',
  'labels',
  'stores',
  'bookmarks',
  'about',
  'privacy',
  'contact',
  'third-party-licenses'
]

test('when default states', () => {
  for (const route of routes) {
    const wrapper = factory({ store, route: { name: route } })
    expect(wrapper.find('thefooterplayertitle-stub').exists()).toBe(false)
    expect(wrapper.find('thefootertracking-stub').exists()).toBe(true)
    expect(wrapper.text()).toBe('')
  }
})

test('when { player.title: "", tracking.disable: false }', () => {
  for (const route of routes) {
    store.commit('tracking/enable')
    const wrapper = factory({ store, route: { name: route } })
    expect(wrapper.find('thefooterplayertitle-stub').exists()).toBe(false)
    expect(wrapper.find('thefootertracking-stub').exists()).toBe(false)
    expect(wrapper.text()).toBe(APP_NAME)
  }
})

test('when { player.title: "something", tracking.disable: true }', () => {
  for (const route of routes) {
    store.commit('player/setItem', fixture.player)
    const wrapper = factory({ store, route: { name: route } })

    if (['track', 'playlist', 'privacy'].includes(route)) {
      expect(wrapper.find('thefooterplayertitle-stub').exists()).toBe(false)
      expect(wrapper.find('thefootertracking-stub').exists()).toBe(true)
    } else {
      expect(wrapper.find('thefooterplayertitle-stub').exists()).toBe(true)
      expect(wrapper.find('thefootertracking-stub').exists()).toBe(false)
    }
    expect(wrapper.text()).toBe('')
  }
})

test('when { player.title: "something", tracking.disable: false }', () => {
  for (const route of routes) {
    store.commit('tracking/enable')
    store.commit('player/setItem', fixture.player)
    const wrapper = factory({ store, route: { name: route } })

    if (['track', 'playlist'].includes(route)) {
      expect(wrapper.find('thefooterplayertitle-stub').exists()).toBe(false)
      expect(wrapper.text()).toBe(APP_NAME)
    } else {
      expect(wrapper.find('thefooterplayertitle-stub').exists()).toBe(true)
      expect(wrapper.text()).toBe('')
    }
    expect(wrapper.find('thefootertracking-stub').exists()).toBe(false)
  }
})
