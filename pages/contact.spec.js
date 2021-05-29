import { shallowMount } from '@vue/test-utils'
import ContactPage from './contact'

const factory = () => {
  return shallowMount(ContactPage, {
    stubs: {
      fa: true
    }
  })
}

test('is visible', () => {
  const wrapper = factory()

  expect(wrapper.text()).toContain('Contact')
  expect(wrapper.text()).toContain('Please to')

  const a = wrapper.findAll('a')
  expect(a.at(0).element.href).toBe('https://twitter.com/livejam_db')
  expect(a.at(1).element.href).toBe('https://github.com/jamband/plusarchive.com/issues')
})
