/** @jest-environment jsdom */
import { shallowMount } from '@vue/test-utils'
import TotalCount from '.'

const factory = (props = {}) => {
  return shallowMount(TotalCount, {
    propsData: props
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

test('case: 1000', () => {
  const wrapper = factory({ total: 1000 })
  expect(wrapper.text()).toBe('1,000 results')
})
