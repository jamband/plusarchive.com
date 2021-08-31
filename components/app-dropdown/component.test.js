import { shallowMount } from '@vue/test-utils'
import { AppDropdown } from '.'

const factory = ({ props }) => {
  return shallowMount(AppDropdown, {
    propsData: props,
    stubs: {
      fa: true
    },
    slots: {
      default: '<a href="https://example.com">Foo</a>'
    }
  })
}

test('id: foo', () => {
  const wrapper = factory({
    props: { id: 'foo' }
  })
  expect(wrapper.find('#foo').classes('tag')).toBe(true)
  expect(wrapper.find('#foo').classes('nav-link')).toBe(false)
  expect(wrapper.find('#foo').text()).toBe('')
  expect(wrapper.find('fa-stub').attributes().icon).toBe('ellipsis-h')
})

test('id: foo, label: bar', () => {
  const wrapper = factory({
    props: { id: 'foo', label: 'bar' }
  })
  expect(wrapper.find('#foo').classes('tag')).toBe(true)
  expect(wrapper.find('#foo').classes('nav-link')).toBe(false)
  expect(wrapper.find('#foo').text()).toContain('bar')
  expect(wrapper.find('fa-stub').attributes().icon).toBe('angle-down')
})

test('id: foo, nav: true', () => {
  const wrapper = factory({
    props: { id: 'foo', nav: true }
  })
  expect(wrapper.find('#foo').classes('tag')).toBe(false)
  expect(wrapper.find('#foo').classes('nav-link')).toBe(true)
  expect(wrapper.find('#foo').text()).toBe('')
  expect(wrapper.find('fa-stub').attributes().icon).toBe('ellipsis-h')
})

test('slot', () => {
  const wrapper = factory({
    props: { id: 'foo' }
  })
  const links = wrapper.find('.dropdown-menu').findAll('a')
  expect(links.length).toBe(1)
  expect(links.at(0).attributes('href')).toBe('https://example.com')
  expect(links.at(0).text()).toBe('Foo')
})
