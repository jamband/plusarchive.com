import { shallowMount } from '@vue/test-utils'
import SearchForm from '~/components/SearchForm'

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

test('q: foo', () => {
  const wrapper = factory({
    props: {},
    route: { name: 'tracks', query: { q: '' } }
  })

  wrapper.setData({ q: 'foo' })
  wrapper.trigger('submit.prevent')

  expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
    name: 'tracks-search',
    query: { q: 'foo' }
  })
})

test('inputClass: default', () => {
  const wrapper = factory({
    props: {},
    route: { query: { q: '' } }
  })
  expect(wrapper.find('input').attributes().class).toBe('form-control')
})

test('inputClass: foo', () => {
  const wrapper = factory({
    props: { inputClass: 'foo' },
    route: { query: { q: '' } }
  })
  expect(wrapper.find('input').attributes().class).toBe('foo')
})

test('placeholder: default', () => {
  const wrapper = factory({
    props: {},
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
