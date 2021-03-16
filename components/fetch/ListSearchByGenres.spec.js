import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ListSearchByGenres from './ListSearchByGenres'

const factory = ({ props }) => {
  return shallowMount(ListSearchByGenres, {
    propsData: props,
    stubs: {
      NLink: RouterLinkStub,
      AppLoading: { template: '<div>...</div>' }
    }
  })
}

test('genres', () => {
  const props = { genres: ['Foo', 'Bar', 'Baz'] }
  const wrapper = factory({ props })

  const a = wrapper.findAll('a')
  expect(a.length).toBe(3)
  expect(a.at(0).text()).toBe('Foo')
  expect(a.at(0).props().to).toEqual({ name: 'tracks', query: { genre: 'Foo' } })
  expect(a.at(1).text()).toBe('Bar')
  expect(a.at(1).props().to).toEqual({ name: 'tracks', query: { genre: 'Bar' } })
  expect(a.at(2).text()).toBe('Baz')
  expect(a.at(2).props().to).toEqual({ name: 'tracks', query: { genre: 'Baz' } })
})
