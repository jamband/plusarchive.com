import { shallowMount } from '@vue/test-utils'
import SearchForm from '.'

const factory = ({ props, route }) => {
  return shallowMount(SearchForm, {
    propsData: props,
    mocks: {
      $router: {
        push: jest.fn()
      },
      $route: route
    }
  })
}

test('disabled: true', () => {
  const routeNames = [
    'tracks',
    'tracks-search',
    'labels',
    'labels-search',
    'stores',
    'stores-search',
    'bookmarks',
    'bookmarks-search'
  ]

  for (const routeName of routeNames) {
    const wrapper = factory({
      route: { name: routeName, query: { q: '' } }
    })
    expect(wrapper.find('fieldset').attributes('disabled')).toBe(undefined)
  }

  const wrapper = factory({
    route: { name: 'foo', query: { q: '' } }
  })
  expect(wrapper.find('fieldset').attributes('disabled')).toBe('disabled')
})

test('placeholder: default', () => {
  const wrapper = factory({
    route: { query: { q: '' } }
  })
  expect(wrapper.find('input').element.placeholder).toBe('Search...')
})

test('placeholder: foo', () => {
  const wrapper = factory({
    props: { placeholder: 'foo' },
    route: { query: { q: '' } }
  })
  expect(wrapper.find('input').element.placeholder).toBe('foo')
})

test('q: foo', () => {
  const wrapper = factory({
    route: { name: 'tracks', query: { q: '' } }
  })

  wrapper.setData({ q: 'foo' })
  wrapper.find('input').trigger('keyup.enter')

  expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
    name: 'tracks-search',
    query: { q: 'foo' }
  })
})
