import { mount } from '@vue/test-utils'
import ThePlayerLoading from '~/components/ThePlayerLoading'

const factory = () => {
  return mount(ThePlayerLoading)
}

describe('components: ThePlayerLoading', () => {
  test('number of div', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
