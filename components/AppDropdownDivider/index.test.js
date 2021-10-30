import { mount } from '@vue/test-utils'
import AppDropdownDivider from '.'

const factory = () => {
  return mount(AppDropdownDivider)
}

test('html', () => {
  const wrapper = factory()
  expect(wrapper.html()).toBe('<hr class="dropdown-divider">')
})
