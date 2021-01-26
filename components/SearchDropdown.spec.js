import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import SearchDropdown from '~/components/SearchDropdown'

const factory = ({ route, fetchState }) => {
  return shallowMount(SearchDropdown, {
    propsData: {
      label: 'Tags',
      query: 'tag',
      items: []
    },
    stubs: {
      BDropdown,
      BDropdownItem,
      fa: true,
      AppLoading: { template: '<div>...</div>' },
      NLink: RouterLinkStub
    },
    mocks: {
      $route: route,
      $fetchState: fetchState
    }
  })
}

test('fetchState.pending: true', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: {} },
    fetchState: { pending: true }
  })
  await wrapper.setData({ list: ['tag1'] })
  expect(wrapper.findAll('a').length).toBe(1)
  expect(wrapper.text()).toContain('...')
})

test('fetchState.error: true', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: {} },
    fetchState: { error: true }
  })
  await wrapper.setData({ list: ['tag1'] })
  expect(wrapper.findAll('a').length).toBe(1)
  expect(wrapper.text()).toContain('Request failure')
})

test('fetchState.pending: false', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: {} },
    fetchState: { pending: false }
  })
  await wrapper.setData({ list: ['tag1'] })
  expect(wrapper.findAll('a').length).toBe(2)
})

test('label when route.query: {}', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: {} },
    fetchState: { pending: false }
  })
  await wrapper.setData({ list: ['tag1'] })
  expect(wrapper.find('button').text()).toBe('Tags')
})

test('label when route.query: { tag: "tag1" }', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: { tag: 'tag1' } },
    fetchState: { pending: false }
  })
  await wrapper.setData({ list: ['tag1'] })
  expect(wrapper.find('button').text()).toBe('tag1')
})

test('a.href/text and text when route.query: { country: "country1" }', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: { country: 'country1' } },
    fetchState: { pending: false }
  })
  await wrapper.setData({ list: ['tag1'] })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('?country=country1')
  expect(a.at(0).text()).toBe('Reset')
  expect(a.at(1).attributes('href')).toBe('?country=country1&tag=tag1')
  expect(a.at(1).text()).toBe('tag1')
})

test('a.href/text when route.query: { country: "country1", tag: "tag2" }', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: { country: 'country1', tag: 'tag2' } },
    fetchState: { pending: false }
  })
  await wrapper.setData({ list: ['tag1'] })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('?country=country1')
  expect(a.at(0).text()).toBe('Reset')
  expect(a.at(1).attributes('href')).toBe('?country=country1&tag=tag1')
  expect(a.at(1).text()).toBe('tag1')
})

test('a.href/text when route.query: { page: "2" }', async () => {
  const wrapper = factory({
    route: { name: 'foo', query: { page: '2' } },
    fetchState: { pending: false }
  })
  await wrapper.setData({ list: ['tag1'] })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('/')
  expect(a.at(0).text()).toBe('Reset')
  expect(a.at(1).attributes('href')).toBe('?tag=tag1')
  expect(a.at(1).text()).toBe('tag1')
})

test('resetLink.href/text when route: { name: tracks-search, q: foo }', async () => {
  const wrapper = factory({
    route: { name: 'tracks-search', query: { q: 'foo' } },
    fetchState: { pending: false }
  })

  await wrapper.setData({ list: ['tag1'] })
  const a = wrapper.findAll('a')
  expect(a.at(0).text()).toBe('Reset')
  expect(a.at(0).props().to).toEqual({ name: 'tracks' })
})
