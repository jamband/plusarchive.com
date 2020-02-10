import { mount } from '@vue/test-utils'
import TotalCount from '~/components/TotalCount'

const factory = (props = {}) => {
  return mount(TotalCount, {
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
