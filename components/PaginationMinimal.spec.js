import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import PaginationMinimal from '~/components/PaginationMinimal'

const factory = (props = {}) => {
  return shallowMount(PaginationMinimal, {
    propsData: props,
    stubs: {
      fa: true,
      NLink: RouterLinkStub
    },
    mocks: {
      $route: {
        query: ''
      },
      $scroll: {
        toTop: jest.fn()
      }
    }
  })
}

const [FIRST, PREV, NEXT, LAST] = [0, 1, 2, 3]

test('dont have page', () => {
  const wrapper = factory({ currentPage: 0, pageCount: 0 })
  expect(wrapper.html()).toBe('')
})

test('current page: first', () => {
  const wrapper = factory({ currentPage: 1, pageCount: 10 })
  const li = wrapper.findAll('ul > li')

  expect(li.at(FIRST).classes()).toContain('disabled')
  expect(li.at(PREV).classes()).toContain('disabled')
  expect(li.at(NEXT).classes()).not.toContain('disabled')
  expect(li.at(LAST).classes()).not.toContain('disabled')

  expect(li.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(PREV).find('a').props().to).toEqual({ query: { page: 0 } })
  expect(li.at(NEXT).find('a').props().to).toEqual({ query: { page: 2 } })
  expect(li.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.pagination-minimal-info').text()).toBe('1/10')
})

test('current page: second', () => {
  const wrapper = factory({ currentPage: 2, pageCount: 10 })
  const li = wrapper.findAll('ul > li')

  expect(li.at(FIRST).classes()).not.toContain('disabled')
  expect(li.at(PREV).classes()).not.toContain('disabled')
  expect(li.at(NEXT).classes()).not.toContain('disabled')
  expect(li.at(LAST).classes()).not.toContain('disabled')

  expect(li.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(PREV).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(NEXT).find('a').props().to).toEqual({ query: { page: 3 } })
  expect(li.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.pagination-minimal-info').text()).toBe('2/10')
})

test('current page: last', () => {
  const wrapper = factory({ currentPage: 10, pageCount: 10 })
  const li = wrapper.findAll('ul > li')

  expect(li.at(FIRST).classes()).not.toContain('disabled')
  expect(li.at(PREV).classes()).not.toContain('disabled')
  expect(li.at(NEXT).classes()).toContain('disabled')
  expect(li.at(LAST).classes()).toContain('disabled')

  expect(li.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(PREV).find('a').props().to).toEqual({ query: { page: 9 } })
  expect(li.at(NEXT).find('a').props().to).toEqual({ query: { page: 11 } })
  expect(li.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.find('.pagination-minimal-info').text()).toBe('10/10')
})
