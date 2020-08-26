import { shallowMount } from '@vue/test-utils'
import TheFooterMinimal from '~/components/TheFooterMinimal'
import { APP_NAME } from '~/plugins/constants'

const factory = () => {
  return shallowMount(TheFooterMinimal, {
  })
}

test('text', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe(APP_NAME)
})
