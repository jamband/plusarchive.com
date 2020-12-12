import { shallowMount } from '@vue/test-utils'
import AppLoading from '~/components/AppLoading'

const factory = () => {
  return shallowMount(AppLoading, {
  })
}

test('text', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe('...')
})
