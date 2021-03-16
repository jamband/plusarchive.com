import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import PaginationMinimal from '~/components/PaginationMinimal'

window.matchMedia = () => {
  return { matches: false }
}

const factory = ({ props }) => {
  return shallowMount(PaginationMinimal, {
    propsData: props,
    stubs: {
      fa: true,
      NLink: RouterLinkStub
    },
    mocks: {
      $route: {
        query: ''
      }
    }
  })
}

const [FIRST, PREV, NEXT, LAST] = [0, 1, 2, 3]

test('dont have page', () => {
  const props = {
    currentPage: 0,
    pageCount: 0
  }
  const wrapper = factory({ props })
  expect(wrapper.html()).toBe('')
})

test('current page: first', () => {
  const props = {
    currentPage: 1,
    pageCount: 10
  }
  const wrapper = factory({ props })
  const li = wrapper.findAll('ul > li')

  expect(li.at(FIRST).classes()).toContain('disabled')
  expect(li.at(PREV).classes()).toContain('disabled')
  expect(li.at(NEXT).classes()).not.toContain('disabled')
  expect(li.at(LAST).classes()).not.toContain('disabled')

  expect(li.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(PREV).find('a').props().to).toEqual({ query: { page: 0 } })
  expect(li.at(NEXT).find('a').props().to).toEqual({ query: { page: 2 } })
  expect(li.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.text()).toContain('1/10')
})

test('current page: second', () => {
  const props = {
    currentPage: 2,
    pageCount: 10
  }
  const wrapper = factory({ props })
  const li = wrapper.findAll('ul > li')

  expect(li.at(FIRST).classes()).not.toContain('disabled')
  expect(li.at(PREV).classes()).not.toContain('disabled')
  expect(li.at(NEXT).classes()).not.toContain('disabled')
  expect(li.at(LAST).classes()).not.toContain('disabled')

  expect(li.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(PREV).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(NEXT).find('a').props().to).toEqual({ query: { page: 3 } })
  expect(li.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.text()).toContain('2/10')
})

test('current page: last', () => {
  const props = {
    currentPage: 10,
    pageCount: 10
  }
  const wrapper = factory({ props })
  const li = wrapper.findAll('ul > li')

  expect(li.at(FIRST).classes()).not.toContain('disabled')
  expect(li.at(PREV).classes()).not.toContain('disabled')
  expect(li.at(NEXT).classes()).toContain('disabled')
  expect(li.at(LAST).classes()).toContain('disabled')

  expect(li.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(li.at(PREV).find('a').props().to).toEqual({ query: { page: 9 } })
  expect(li.at(NEXT).find('a').props().to).toEqual({ query: { page: 11 } })
  expect(li.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.text()).toContain('10/10')
})
