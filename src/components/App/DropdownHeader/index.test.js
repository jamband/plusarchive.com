/** @jest-environment jsdom */
import { mount } from '@vue/test-utils'
import AppDropdownHeader from '.'

const factory = ({ slot }) => {
  return mount(AppDropdownHeader, {
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
