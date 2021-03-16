import Vuex from 'vuex'
import { klona } from 'klona'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import ListPlaylists from './ListPlaylists'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = ({ props, store }) => {
  return shallowMount(ListPlaylists, {
    propsData: props,
    store,
    localVue,
    stubs: {
      fa: true,
      NLink: RouterLinkStub,
      AppLoading: { template: '<div>...</div>' }
    }
  })
}

const props = {
  playlists: [
    { id: 1, title: 'playlist1' },
    { id: 2, title: 'playlist2' },
    { id: 3, title: 'playlist3' }
  ]
}

const player = klona(storePlayer)
player.namespaced = true

test('playlists', () => {
  const wrapper = factory({ props })
  const li = wrapper.findAll('li')
  expect(li.length).toBe(3)
  expect(li.at(0).text()).toBe('playlist1')
  expect(li.at(0).find('a').props().to).toEqual({ name: 'playlist', params: { id: 1 } })
  expect(li.at(1).text()).toBe('playlist2')
  expect(li.at(1).find('a').props().to).toEqual({ name: 'playlist', params: { id: 2 } })
  expect(li.at(2).text()).toBe('playlist3')
  expect(li.at(2).find('a').props().to).toEqual({ name: 'playlist', params: { id: 3 } })
})

test('When click on a specific playlist', () => {
  const wrapper = factory({
    props,
    store: new Vuex.Store({ modules: { player } })
  })
  const $store = wrapper.vm.$store
  expect($store.state.player.loading).toBe(false)

  wrapper.findAll('li > a').at(0).trigger('click')
  expect($store.state.player.loading).toBe(true)
})

test('When click a playlist with the same ID as the player', () => {
  const wrapper = factory({
    props,
    store: new Vuex.Store({ modules: { player } })
  })
  const $store = wrapper.vm.$store
  expect($store.state.player.loading).toBe(false)

  $store.commit('player/setItem', { id: 1 })
  wrapper.findAll('li > a').at(0).trigger('click')
  expect($store.state.player.loading).toBe(false)
})
