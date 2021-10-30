import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
import { klona } from 'klona'
import Vuex, { Store } from 'vuex'
import TrackCard from '.'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = ({ store, props }) => shallowMount(TrackCard, {
  localVue,
  store,
  propsData: props,
  stubs: {
    NLink: RouterLinkStub,
    fa: true
  }
})

const player = klona(storePlayer)
player.namespaced = true

let store, props

beforeEach(() => {
  store = new Store({ modules: { player } })

  props = {
    id: '',
    image: '',
    title: '',
    provider: '',
    footer: ''
  }
})

test('props.provider', () => {
  props.provider = 'Bandcamp'
  const provider = factory({ store, props }).vm.$options.props.provider

  expect(provider.validator('Foo')).toBe(false)
  expect(provider.validator('Bandcamp')).toBe(true)
  expect(provider.validator('SoundCloud')).toBe(true)
  expect(provider.validator('Vimeo')).toBe(true)
  expect(provider.validator('YouTube')).toBe(true)
})

test('ratioSelector', () => {
  props.provider = 'Bandcamp'
  expect(factory({ store, props }).findComponent(RouterLinkStub)
    .classes('ratio-1x1')).toBe(true)

  props.provider = 'SoundCloud'
  expect(factory({ store, props }).findComponent(RouterLinkStub)
    .classes('ratio-1x1')).toBe(true)

  props.provider = 'Vimeo'
  expect(factory({ store, props }).findComponent(RouterLinkStub)
    .classes('ratio-16x9')).toBe(true)

  props.provider = 'YouTube'
  expect(factory({ store, props }).findComponent(RouterLinkStub)
    .classes('ratio-16x9')).toBe(true)
})

test('play', () => {
  props.id = 'foo'
  props.provider = 'Bandcamp'

  expect(store.state.player.loading).toBe(false)

  store.dispatch('player/fetchItem', { id: 'foo' })
  factory({ store, props }).findComponent(RouterLinkStub).trigger('click')
  expect(store.state.player.loading).toBe(false)

  store.dispatch('player/fetchItem', { id: 'bar' })
  factory({ store, props }).findComponent(RouterLinkStub).trigger('click')
  expect(store.state.player.loading).toBe(true)
})

test('audioStatusIcon', () => {
  props.provider = 'Bandcamp'

  props.id = 'foo'
  expect(factory({ store, props }).find('.play fa-stub').attributes('icon'))
    .toBe('play-circle')

  store.dispatch('player/fetchItem', { id: 'foo' })
  expect(factory({ store, props }).find('.play fa-stub').attributes('icon'))
    .toBe('pause-circle')
})
