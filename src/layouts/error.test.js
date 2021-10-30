import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import ErrorPage from './error'

const factory = ({ props }) => {
  return shallowMount(ErrorPage, {
    propsData: props,
    stubs: {
      fa: true,
      NLink: RouterLinkStub
    }
  })
}

test('when 404', () => {
  const props = { error: { statusCode: 404 } }
  const wrapper = factory({ props })
  expect(wrapper.find('h1').text()).toBe('Not Found')
  expect(wrapper.text()).toContain('Page not found.')
  expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({ name: 'index' })
})

test('when 500', () => {
  const props = { error: { statusCode: 500 } }
  const wrapper = factory({ props })
  expect(wrapper.find('h1').text()).toBe('An Error Occurred')
  expect(wrapper.text()).toContain('An error occurred.')
  expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({ name: 'index' })
})
