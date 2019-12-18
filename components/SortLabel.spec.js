import { mount } from '@vue/test-utils'
import SortLabel from '~/components/SortLabel'

const factory = (route = {}) => {
  return mount(SortLabel, {
    propsData: {
      query: 'provider',
      label: 'Providers'
    },
    mocks: {
      $route: route
    }
  })
}

describe('components: SortLabel', () => {
  test('dont have some queries', () => {
    const wrapper = factory({ query: '' })
    expect(wrapper.find('div').text()).toBe('Providers')
  })

  test('have some queries', () => {
    const wrapper = factory({ query: { provider: 'Bandcamp' } })
    expect(wrapper.find('div').text()).toBe('Bandcamp')
  })
})
