import { shallowMount } from '@vue/test-utils'
import About from '~/pages/about'

const $app = {
  name: 'Foo'
}

const factory = () => {
  return shallowMount(About, {
    stubs: {
      fa: true
    },
    mocks: {
      $app
    }
  })
}

test('is visible', () => {
  const wrapper = factory()

  expect(wrapper.text()).toContain('About')
  expect(wrapper.text()).toContain(`${$app.name} is`)

  const a = wrapper.findAll('a')
  expect(a.at(0).element.href).toBe('https://github.com/jamband/plusarchive.com')
})
