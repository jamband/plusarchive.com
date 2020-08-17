import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import { klona } from 'klona'
import TheFooterPlayerTitle from '~/components/TheFooterPlayerTitle'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)

const factory = (store = {}) => {
  return shallowMount(TheFooterPlayerTitle, {
    localVue,
    store,
    stubs: {
      fa: true,
      NLink: RouterLinkStub
    },
    mocks: {
      $app: jest.fn()
    }
  })
}

const player = klona(storePlayer)
player.namespaced = true

let fixture, store

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

test('title route', () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store)
  expect(wrapper.find('a').props().to)
    .toEqual({ name: 'track', params: { id: 'id1' } })
})

test('title', () => {
  fixture.player.title = 'a'.repeat(50)
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store)
  expect(/^a{40}\.\.\.$/.test(wrapper.find('a').text()))
    .toBe(true)
})

test('click clear', async () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store)
  expect(wrapper.find('a').text()).toBe('title1')

  const button = wrapper.find('button')
  await button.trigger('click')

  expect(wrapper.find('a').text()).toBe('')
})
