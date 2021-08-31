import { shallowMount } from '@vue/test-utils'
import { TheFooterMinimal } from '.'
import { APP_NAME } from '~/constants/app'

const factory = () => {
  return shallowMount(TheFooterMinimal, {
  })
}

test('text', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe(APP_NAME)
})
