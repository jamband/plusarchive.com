import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import ThePlayer from '~/components/ThePlayer'
import storePlayer from '~/store/player'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(pluginFontAwesome)

const factory = (store = {}) => {
  return mount(ThePlayer, {
    localVue,
    store,
    stubs: {
      NLink: RouterLinkStub
    },
    mocks: {
      $route: { name: '' }
    }
  })
}

describe('components: ThePlayer', () => {
  const player = cloneDeep(storePlayer)
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
    const wrapper = factory(store)
    expect(wrapper.find('h5').text()).toBe('title1 via provider1')
  })

  test('aspect ratio when { provider: "Bandcamp" }', () => {
    fixture.player.provider = 'Bandcamp'
    store.commit('player/setItem', fixture.player)
    const wrapper = factory(store)
    expect(wrapper.find('.embed-responsive').attributes().class).toContain('1by1')
  })

  test('aspect ratio when { provider: "SoundCloud" }', () => {
    fixture.player.provider = 'SoundCloud'
    store.commit('player/setItem', fixture.player)
    const wrapper = factory(store)
    expect(wrapper.find('.embed-responsive').attributes().class).toContain('1by1')
  })

  test('aspect ratio when { provider: "Vimeo" }', () => {
    fixture.player.provider = 'Vimeo'
    store.commit('player/setItem', fixture.player)
    const wrapper = factory(store)
    expect(wrapper.find('.embed-responsive').attributes().class).toContain('16by9')
  })

  test('aspect ratio when { provider: "YouTube" }', () => {
    fixture.player.provider = 'YouTube'
    store.commit('player/setItem', fixture.player)
    const wrapper = factory(store)
    expect(wrapper.find('.embed-responsive').attributes().class).toContain('16by9')
  })

  test('backTo and backToLabel when { type: "track" }', () => {
    fixture.player.type = 'track'
    store.commit('player/setItem', fixture.player)
    const wrapper = factory(store)
    expect(wrapper.text()).toContain('Back to Tracks')
  })

  test('backTo and backToLabel when { type: "playlist" }', () => {
    fixture.player.type = 'playlist'
    store.commit('player/setItem', fixture.player)
    const wrapper = factory(store)
    expect(wrapper.text()).toContain('Back to Playlists')
  })
})
