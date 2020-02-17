import { mount } from '@vue/test-utils'
import ThePlayerLoading from '~/components/ThePlayerLoading'

const factory = () => {
  return mount(ThePlayerLoading)
}

test('...', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe('...')
})
