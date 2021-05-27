import { mount } from '@vue/test-utils'
import AppDropdownText from './AppDropdownText'

const factory = ({ slot }) => {
  return mount(AppDropdownText, {
    slots: {
      default: slot
    }
  })
}

test('text', () => {
  const wrapper = factory({
    slot: 'foo'
  })
  expect(wrapper.text()).toBe('foo')
})
