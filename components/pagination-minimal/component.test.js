import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { PaginationMinimal } from '.'

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

test('dont have page', () => {
  const props = {
    currentPage: 0,
    pageCount: 0
  }
  const wrapper = factory({ props })
  expect(wrapper.html()).toBe('')
})

const [FIRST, PREVIOUS, NEXT, LAST] = [0, 1, 2, 3]

test('current page: first', () => {
  const props = {
    currentPage: 1,
    pageCount: 10
  }
  const wrapper = factory({ props })
  const list = wrapper.findAll('li')

  expect(list.at(FIRST).classes()).toContain('disabled')
  expect(list.at(PREVIOUS).classes()).toContain('disabled')
  expect(list.at(NEXT).classes()).not.toContain('disabled')
  expect(list.at(LAST).classes()).not.toContain('disabled')

  expect(list.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(list.at(PREVIOUS).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(list.at(NEXT).find('a').props().to).toEqual({ query: { page: 2 } })
  expect(list.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.text()).toContain('1/10')
})

test('current page: second', () => {
  const props = {
    currentPage: 2,
    pageCount: 10
  }
  const wrapper = factory({ props })
  const list = wrapper.findAll('li')

  expect(list.at(FIRST).classes()).not.toContain('disabled')
  expect(list.at(PREVIOUS).classes()).not.toContain('disabled')
  expect(list.at(NEXT).classes()).not.toContain('disabled')
  expect(list.at(LAST).classes()).not.toContain('disabled')

  expect(list.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(list.at(PREVIOUS).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(list.at(NEXT).find('a').props().to).toEqual({ query: { page: 3 } })
  expect(list.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.text()).toContain('2/10')
})

test('current page: last', () => {
  const props = {
    currentPage: 10,
    pageCount: 10
  }
  const wrapper = factory({ props })
  const list = wrapper.findAll('li')

  expect(list.at(FIRST).classes()).not.toContain('disabled')
  expect(list.at(PREVIOUS).classes()).not.toContain('disabled')
  expect(list.at(NEXT).classes()).toContain('disabled')
  expect(list.at(LAST).classes()).toContain('disabled')

  expect(list.at(FIRST).find('a').props().to).toEqual({ query: { page: 1 } })
  expect(list.at(PREVIOUS).find('a').props().to).toEqual({ query: { page: 9 } })
  expect(list.at(NEXT).find('a').props().to).toEqual({ query: { page: 10 } })
  expect(list.at(LAST).find('a').props().to).toEqual({ query: { page: 10 } })

  expect(wrapper.text()).toContain('10/10')
})
