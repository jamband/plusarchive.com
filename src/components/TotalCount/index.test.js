import { shallowMount } from '@vue/test-utils'
import TotalCount from '.'

const factory = (props = {}) => {
  return shallowMount(TotalCount, {
    propsData: props,
    stubs: {
      fa: true
    }
  })
}

test('case: 0', () => {
  const wrapper = factory({ total: 0 })
  expect(wrapper.text()).toBe('No results found')
})

test('case: 100', () => {
  const wrapper = factory({ total: 100 })
  expect(wrapper.text()).toBe('100 results')
})
