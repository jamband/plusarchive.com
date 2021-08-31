import Vuex, { Store } from 'vuex'
import { klona } from 'klona'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { ThePlayer } from '.'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = ({ store = {}, route = {} }) => {
  return shallowMount(ThePlayer, {
    localVue,
    store,
    stubs: {
      fa: true,
      NLink: RouterLinkStub
    },
    mocks: {
      $route: route
    }
  })
}

const player = klona(storePlayer)
player.namespaced = true

let store, fixture

beforeEach(() => {
  store = new Store({ modules: { player } })

  fixture = {}
  fixture.player = {
    id: 'id1',
    title: 'title1',
    provider: 'provider1',
    type: 'track',
    src: 'src1'
  }
})

test('title', () => {
  store.commit('player/setItem', fixture.player)
  const title = factory({ store }).find('h5')
  expect(title.text()).toContain(fixture.player.title)
  expect(title.text()).toContain(fixture.player.provider)
})

test('ratio', () => {
  const ratios = {
    Bandcamp: '1x1',
    SoundCloud: '1x1',
    Vimeo: '16x9',
    YouTube: '16x9'
  }
  for (const [provider, ratio] of Object.entries(ratios)) {
    fixture.player.provider = provider
    store.commit('player/setItem', fixture.player)
    expect(factory({ store }).find('.ratio').attributes().class)
      .toContain(ratio)
  }
})

test('backTo', () => {
  const items = [
    { type: 'track', currentRoute: 'tracks-id', backTo: 'tracks' },
    { type: 'playlist', currentRoute: 'playlists-id', backTo: 'playlists' }
  ]
  for (const { type, currentRoute, backTo } of items) {
    fixture.player.type = type
    store.commit('player/setItem', fixture.player)
    const wrapper = factory({ store, route: { name: currentRoute } })
    expect(wrapper.find('a').props().to).toEqual({ name: backTo })
  }
})

test('backToLabel', () => {
  const items = [
    { type: 'track', label: 'Tracks' },
    { type: 'playlist', label: 'Playlists' }
  ]
  for (const { type, label } of items) {
    fixture.player.type = type
    store.commit('player/setItem', fixture.player)
    expect(factory({ store }).text()).toContain(`Back to ${label}`)
  }
})
