import { shallowMount } from '@vue/test-utils'
import { ThePlayerLoading } from '.'

const factory = () => {
  return shallowMount(ThePlayerLoading, {
  })
}

test('...', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe('...')
})
