import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import PaginationMinimal from '~/components/PaginationMinimal'
import pluginScroll from '~/plugins/scroll'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(pluginFontAwesome)
localVue.use(pluginScroll)

const factory = (props = {}) => {
  return mount(PaginationMinimal, {
    localVue,
    propsData: props,
    stubs: {
      NLink: RouterLinkStub
    },
    mocks: {
      $route: { query: '' }
    }
  })
}

test('dont have page', () => {
  const wrapper = factory({ currentPage: 0, pageCount: 0 })
  expect(wrapper.html()).toBe('')
})

test('current page: first', () => {
  const wrapper = factory({ currentPage: 1, pageCount: 10 })
  const li = wrapper.findAll('ul > li')

  expect(li.at(0).classes()).toContain('disabled')
  expect(li.at(1).classes()).toContain('disabled')
  expect(li.at(2).classes()).not.toContain('disabled')
  expect(li.at(3).classes()).not.toContain('disabled')

  expect(li.at(0).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(1).find(RouterLinkStub).props().to).toEqual({ query: { page: 0 } })
  expect(li.at(2).find(RouterLinkStub).props().to).toEqual({ query: { page: 2 } })
  expect(li.at(3).find(RouterLinkStub).props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.pagination-minimal-info').text()).toBe('1/10')
})

test('current page: second', () => {
  const wrapper = factory({ currentPage: 2, pageCount: 10 })
  const li = wrapper.findAll('ul > li')

  expect(li.at(0).classes()).not.toContain('disabled')
  expect(li.at(1).classes()).not.toContain('disabled')
  expect(li.at(2).classes()).not.toContain('disabled')
  expect(li.at(3).classes()).not.toContain('disabled')

  expect(li.at(0).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(1).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(2).find(RouterLinkStub).props().to).toEqual({ query: { page: 3 } })
  expect(li.at(3).find(RouterLinkStub).props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.pagination-minimal-info').text()).toBe('2/10')
})

test('current page: last', () => {
  const wrapper = factory({ currentPage: 10, pageCount: 10 })
  const li = wrapper.findAll('ul > li')

  expect(li.at(0).classes()).not.toContain('disabled')
  expect(li.at(1).classes()).not.toContain('disabled')
  expect(li.at(2).classes()).toContain('disabled')
  expect(li.at(3).classes()).toContain('disabled')

  expect(li.at(0).find(RouterLinkStub).props().to).toEqual({ query: { page: 1 } })
  expect(li.at(1).find(RouterLinkStub).props().to).toEqual({ query: { page: 9 } })
  expect(li.at(2).find(RouterLinkStub).props().to).toEqual({ query: { page: 11 } })
  expect(li.at(3).find(RouterLinkStub).props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.pagination-minimal-info').text()).toBe('10/10')
})
