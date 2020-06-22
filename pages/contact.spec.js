import { shallowMount } from '@vue/test-utils'
import Contact from '~/pages/contact'

const factory = () => {
  return shallowMount(Contact, {
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
