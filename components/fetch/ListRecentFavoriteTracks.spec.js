import Vuex from 'vuex'
import { klona } from 'klona'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import ListRecentFavoriteTracks from './ListRecentFavoriteTracks'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = ({ store, fetchState }) => {
  return shallowMount(ListRecentFavoriteTracks, {
    store,
    localVue,
    stubs: {
      NLink: RouterLinkStub,
      AppLoading: { template: '<div>...</div>' },
      CardLazyImage: true,
      fa: true
    },
    mocks: {
      $fetchState: fetchState
    }
  })
}

const stub = {
  icon: 'fa-stub',
  image: 'cardlazyimage-stub'
}

const data = {
  tracks: [
    {
      id: 1,
      title: 'Track1',
      image: 'track1-image',
      provider: 'Bandcamp',
      genres: [
        { name: 'Track1-genre1' },
        { name: 'Track1-genre2' }
      ]
    },
    {
      id: 2,
      title: 'Track2',
      image: 'track2-image',
      provider: 'Vimeo',
      genres: [
        { name: 'Track2-genre1' },
        { name: 'Track2-genre2' }
      ]
    },
    {
      id: 3,
      title: 'Track3',
      image: 'track3-image',
      provider: 'YouTube',
      genres: [
        { name: 'Track3-genre1' },
        { name: 'Track3-genre2' }
      ]
    }
  ]
}

test('fetchState.pending: true', () => {
  const wrapper = factory({
    fetchState: { pending: true }
  })
  const card = wrapper.findAll('.card')
  expect(card.length).toBe(3)
})

test('fetchState.error: true', () => {
  const wrapper = factory({
    fetchState: { error: true }
  })
  expect(wrapper.text()).toBe('Request failure.')
})

const player = klona(storePlayer)
player.namespaced = true

test('fetchState.pending: false', async () => {
  const wrapper = factory({
    store: new Vuex.Store({ modules: { player } }),
    fetchState: { pending: false }
  })
  await wrapper.setData(data)

  const card = wrapper.findAll('.card')
  expect(card.length).toBe(3)

  const card1 = card.at(0)
  expect(card1.find(stub.image).attributes().aspectratio).toBe('1/1')
  expect(card1.text()).toContain('Track1')
  card1.a = card1.findAll('a')
  expect(card1.a.at(0).props().to).toEqual({ name: 'track', params: { id: 1 } })
  expect(card1.a.at(1).props().to).toEqual({ name: 'tracks', query: { genre: 'Track1-genre1' } })
  expect(card1.a.at(2).props().to).toEqual({ name: 'tracks', query: { genre: 'Track1-genre2' } })
  expect(card1.findAll(stub.icon).at(1).attributes().icon).toBe('fab,bandcamp')

  const card2 = card.at(1)
  expect(card2.find(stub.image).attributes().aspectratio).toBe('16/9')
  expect(card2.text()).toContain('Track2')
  card2.a = card2.findAll('a')
  expect(card2.a.at(0).props().to).toEqual({ name: 'track', params: { id: 2 } })
  expect(card2.a.at(1).props().to).toEqual({ name: 'tracks', query: { genre: 'Track2-genre1' } })
  expect(card2.a.at(2).props().to).toEqual({ name: 'tracks', query: { genre: 'Track2-genre2' } })
  expect(card2.findAll(stub.icon).at(1).attributes().icon).toBe('fab,vimeo-square')

  const card3 = card.at(2)
  expect(card3.find(stub.image).attributes().aspectratio).toBe('16/9')
  expect(card3.text()).toContain('Track3')
  card3.a = card3.findAll('a')
  expect(card3.a.at(0).props().to).toEqual({ name: 'track', params: { id: 3 } })
  expect(card3.a.at(1).props().to).toEqual({ name: 'tracks', query: { genre: 'Track3-genre1' } })
  expect(card3.a.at(2).props().to).toEqual({ name: 'tracks', query: { genre: 'Track3-genre2' } })
  expect(card3.findAll(stub.icon).at(1).attributes().icon).toBe('fab,youtube-square')
})

test('When click on a specific track', async () => {
  const wrapper = factory({
    store: new Vuex.Store({ modules: { player } }),
    fetchState: { pending: false }
  })
  await wrapper.setData(data)
  const card = wrapper.findAll('.card')
  const card1 = card.at(0)
  const card2 = card.at(1)
  const card3 = card.at(2)
  card1.a = card1.findAll('a')
  card2.a = card2.findAll('a')
  card3.a = card3.findAll('a')
  const icon = 'fa-stub'

  const $store = wrapper.vm.$store
  expect($store.state.player.loading).toBe(false)
  expect(card1.a.at(0).findAll(icon).at(0).attributes().icon).toBe('play-circle')

  expect($store.state.player.loading).toBe(false)
  card1.a.at(0).trigger('click')
  expect($store.state.player.loading).toBe(true)

  $store.commit('player/setItem', { id: 1 })
  wrapper.vm.$nextTick(() => {
    expect(card1.a.at(0).findAll(icon).at(0).attributes().icon).toBe('pause-circle')
    expect(card2.a.at(0).findAll(icon).at(0).attributes().icon).toBe('play-circle')
    expect(card3.a.at(0).findAll(icon).at(0).attributes().icon).toBe('play-circle')
  })
})
