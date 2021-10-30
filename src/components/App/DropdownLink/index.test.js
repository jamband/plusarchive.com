/** @jest-environment jsdom */
import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import AppDropdownLink from '.'

const factory = ({ to, slot }) => {
  return shallowMount(AppDropdownLink, {
    propsData: {
      to
    },
    stubs: {
      NLink: RouterLinkStub
    },
    slots: {
      default: slot
    }
  })
}

test('link', () => {
  const wrapper = factory({
    to: { name: 'foo' },
    slot: 'foo'
  })
  expect(wrapper.props().to).toEqual({ name: 'foo' })
  expect(wrapper.text()).toBe('foo')
})
