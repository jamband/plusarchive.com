/** @jest-environment jsdom */
import { shallowMount } from '@vue/test-utils'
import AppLoading from '.'

const factory = () => {
  return shallowMount(AppLoading, {
  })
}

test('text', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe('...')
})
