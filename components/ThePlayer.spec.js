import Vuex from 'vuex'
import klona from 'klona'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import ThePlayer from '~/components/ThePlayer'
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
  store = new Vuex.Store({ modules: { player } })

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
  expect(factory({ store }).text())
    .toContain(`${fixture.player.title} via ${fixture.player.provider}`)
})

test('aspectRatio', () => {
  const aspectRatio = {
    Bandcamp: '1by1',
    SoundCloud: '1by1',
    Vimeo: '16by9',
    YouTube: '16by9'
  }
  for (const [provider, ratio] of Object.entries(aspectRatio)) {
    fixture.player.provider = provider
    store.commit('player/setItem', fixture.player)
    expect(factory({ store }).find('.embed-responsive').attributes().class)
      .toContain(ratio)
  }
})

test('backTo', () => {
  const backTo = {
    track: 'tracks',
    playlist: 'playlists'
  }
  for (const [type, route] of Object.entries(backTo)) {
    fixture.player.type = type
    store.commit('player/setItem', fixture.player)
    const wrapper = factory({ store, route: { name: type } })
    expect(wrapper.find('a').props().to).toEqual({ name: route })
  }
})

test('backToLabel', () => {
  const backToLabel = {
    track: 'Tracks',
    playlist: 'Playlists'
  }
  for (const [type, label] of Object.entries(backToLabel)) {
    fixture.player.type = type
    store.commit('player/setItem', fixture.player)
    expect(factory({ store }).text()).toContain(`Back to ${label}`)
  }
})
