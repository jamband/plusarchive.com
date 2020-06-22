import { shallowMount } from '@vue/test-utils'
import Error from '~/layouts/error'

const $app = {
  name: 'Foo'
}

const factory = (props = {}) => {
  return shallowMount(Error, {
    propsData: props,
    stubs: {
      fa: true
    },
    mocks: {
      $app
    }
  })
}

test('header text when { statusCode: 404 }', () => {
  const wrapper = factory({ error: { statusCode: 404 } })
  expect(wrapper.find('h1').text()).toBe(`Not Found (#404) - ${$app.name}`)
})

test('header text when { statusCode: 500 }', () => {
  const wrapper = factory({ error: { statusCode: 500 } })
  expect(wrapper.find('h1').text()).toBe(`An Error Occurred (#500) - ${$app.name}`)
})

test('message when { statusCode: 404 }', () => {
  const wrapper = factory({ error: { statusCode: 404 } })
  expect(wrapper.find('.alert').text()).toBe('Page not found.')
})

test('message when { statusCode: 500 }', () => {
  const wrapper = factory({ error: { statusCode: 500 } })
  expect(wrapper.find('.alert').text()).toBe('An error occurred.')
})
