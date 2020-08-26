import { shallowMount } from '@vue/test-utils'
import About from '~/pages/about'
import { APP_NAME } from '~/plugins/constants'

const factory = () => {
  return shallowMount(About, {
    stubs: {
      fa: true
    }
  })
}

test('is visible', () => {
  const wrapper = factory()

  expect(wrapper.text()).toContain('About')
  expect(wrapper.text()).toContain(`${APP_NAME} is`)

  const a = wrapper.findAll('a')
  expect(a.at(0).element.href).toBe('https://github.com/jamband/plusarchive.com')
})
