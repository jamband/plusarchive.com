import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import TheFooterPlayerTitle from '~/components/TheFooterPlayerTitle'
import pluginApp from '~/plugins/app'
import pluginFontAwesome from '~/plugins/fontawesome'
import storePlayer from '~/store/player'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(pluginApp)
localVue.use(pluginFontAwesome)

const factory = (store = {}) => {
  return mount(TheFooterPlayerTitle, {
    localVue,
    store,
    stubs: {
      NLink: RouterLinkStub
    }
  })
}

const player = cloneDeep(storePlayer)
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
  expect(wrapper.findAllComponents(RouterLinkStub).at(0).props().to)
    .toEqual({ name: 'track', params: { id: 'id1' } })
})

test('title', () => {
  fixture.player.title = 'a'.repeat(50)
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store)
  expect(/^a{40}\.\.\.$/.test(wrapper.findAllComponents(RouterLinkStub).at(0).text()))
    .toBe(true)
})

test('click clear', async () => {
  store.commit('player/setItem', fixture.player)
  const wrapper = factory(store)
  expect(wrapper.findAllComponents(RouterLinkStub).at(0).text()).toBe('title1')

  const button = wrapper.find('button')
  await button.trigger('click')

  expect(wrapper.findAllComponents(RouterLinkStub).at(0).text()).toBe('')
})
