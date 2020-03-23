import { mount } from '@vue/test-utils'
import BaseLinkExternal from '~/components/BaseLinkExternal'

const factory = (props = {}) => {
  return mount(BaseLinkExternal, {
    propsData: props,
    slots: { default: '<span>foo</span>' }
  })
}

test('{ href: "https://example.com" }', () => {
  const props = { href: 'https://example.com' }
  const wrapper = factory(props)
  const element = wrapper.find('a').element

  expect(element.href).toBe('https://example.com/')
  expect(element.rel).toBe('noopener')
  expect(element.target).toBe('_blank')
  expect(element.innerHTML).toBe('<span>foo</span>')
})

test('{ href: "https://example.com", noreferrer: true }', () => {
  const props = { href: 'https://example.com' }
  props.noreferrer = true
  const wrapper = factory(props)
  const element = wrapper.find('a').element

  expect(element.href).toBe('https://example.com/')
  expect(element.rel).toBe('noopener noreferrer')
  expect(element.target).toBe('_blank')
  expect(element.innerHTML).toBe('<span>foo</span>')
})

test('{ href: "https://example.com", rel: "author" }', () => {
  const props = { href: 'https://example.com' }
  props.rel = 'author'
  const wrapper = factory(props)
  const element = wrapper.find('a').element

  expect(element.href).toBe('https://example.com/')
  expect(element.rel).toBe('noopener author')
  expect(element.target).toBe('_blank')
  expect(element.innerHTML).toBe('<span>foo</span>')
})
