import { shallowMount } from '@vue/test-utils'
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import SearchDropdown from '~/components/SearchDropdown'

const factory = ({ props, route }) => {
  return shallowMount(SearchDropdown, {
    propsData: props,
    stubs: {
      BDropdown,
      BDropdownItem,
      fa: true
    },
    mocks: {
      $route: route
    }
  })
}

const props = {
  label: 'Tags',
  query: 'tag',
  items: ['tag1', 'tag2', 'tag3']
}
const route = {
  query: { tag: '' }
}
let wrapper

test('label', () => {
  const text = (wrapper) => {
    return wrapper.find('button').text()
  }
  wrapper = factory({ props, route })
  expect(text(wrapper)).toBe('Tags')

  route.query = { tag: 'tag1' }
  wrapper = factory({ props, route })
  expect(text(wrapper)).toBe('tag1')
})

test('query: none', () => {
  wrapper = factory({ props, route })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('/')
  expect(a.at(1).attributes('href')).toBe('?tag=tag1')
})

test('query: tag=tag1', () => {
  route.query = { tag: 'tag1' }
  wrapper = factory({ props, route })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('/')
  expect(a.at(1).attributes('href')).toBe('?tag=tag1')
})

test('query: country=country1', () => {
  route.query = { country: 'country1' }
  wrapper = factory({ props, route })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('?country=country1')
  expect(a.at(1).attributes('href')).toBe('?country=country1&tag=tag1')
})

test('query: country=country1&tag=tag2', () => {
  route.query = { country: 'country1', tag: 'tag2' }
  wrapper = factory({ props, route })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('?country=country1')
  expect(a.at(1).attributes('href')).toBe('?country=country1&tag=tag1')
})

test('query: search=foo', () => {
  route.query = { search: 'foo' }
  wrapper = factory({ props, route })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('?search=foo')
  expect(a.at(1).attributes('href')).toBe('?tag=tag1')
})

test('query: page=2', () => {
  route.query = { page: '2' }
  wrapper = factory({ props, route })
  const a = wrapper.findAll('a')
  expect(a.at(0).attributes('href')).toBe('/')
  expect(a.at(1).attributes('href')).toBe('?tag=tag1')
})
