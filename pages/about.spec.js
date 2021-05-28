import { shallowMount } from '@vue/test-utils'
import About from './about'
import { APP_NAME } from '~/constants/app'

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
