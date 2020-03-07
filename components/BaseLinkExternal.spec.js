import { mount } from '@vue/test-utils'
import BaseLinkExternal from '~/components/BaseLinkExternal'

const factory = (props = {}) => {
  return mount(BaseLinkExternal, {
    propsData: props
  })
}

test('element', () => {
  const wrapper = factory({ href: 'https://example.com' })
  const element = wrapper.find('a').element
  expect(element.href).toBe('https://example.com/')
  expect(element.rel).toBe('noopener')
  expect(element.target).toBe('_blank')
})
