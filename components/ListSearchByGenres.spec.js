import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ListSearchByGenres from '~/components/ListSearchByGenres'

const factory = ({ fetchState }) => {
  return shallowMount(ListSearchByGenres, {
    stubs: {
      NLink: RouterLinkStub,
      AppLoading: { template: '<div>...</div>' }
    },
    mocks: {
      $fetchState: fetchState
    }
  })
}

test('fetchState.pending: true', () => {
  const wrapper = factory({
    fetchState: { pending: true }
  })
  expect(wrapper.text()).toBe('...')
})

test('fetchState.error: true', () => {
  const wrapper = factory({
    fetchState: { error: true }
  })
  expect(wrapper.text()).toBe('Request failure.')
})

test('fetchState.pending: false', async () => {
  const wrapper = factory({
    fetchState: { pending: false }
  })
  await wrapper.setData({
    genres: ['Foo', 'Bar', 'Baz']
  })

  const a = wrapper.findAll('a')
  expect(a.length).toBe(3)
  expect(a.at(0).text()).toBe('Foo')
  expect(a.at(0).props().to).toEqual({ name: 'tracks', query: { genre: 'Foo' } })
  expect(a.at(1).text()).toBe('Bar')
  expect(a.at(1).props().to).toEqual({ name: 'tracks', query: { genre: 'Bar' } })
  expect(a.at(2).text()).toBe('Baz')
  expect(a.at(2).props().to).toEqual({ name: 'tracks', query: { genre: 'Baz' } })
})
