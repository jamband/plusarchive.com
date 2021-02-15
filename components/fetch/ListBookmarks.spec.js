import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ListBookmarks from './ListBookmarks'

const factory = ({ fetchState }) => {
  return shallowMount(ListBookmarks, {
    stubs: {
      fa: true,
      NLink: RouterLinkStub,
      BrandIconLink: true,
      AppLoading: { template: '<div>...</div>' },
      PaginationMinimal: true
    },
    mocks: {
      $fetchState: fetchState
    }
  })
}
const data = {
  bookmarks: [
    {
      id: 1,
      name: 'Bookmark1',
      url: 'https://bookmark1.com',
      country: 'Country1',
      link: 'https://twitter.com/bookmark1',
      tags: [
        { name: 'Bookmark1-tag1' },
        { name: 'Bookmark1-tag2' }
      ]
    },
    {
      id: 2,
      name: 'Bookmark2',
      url: 'https://bookmark2.com',
      country: 'Country2',
      link: 'https://twitter.com/bookmark2',
      tags: [
        { name: 'Bookmark2-tag1' },
        { name: 'Bookmark2-tag2' }
      ]
    },
    {
      id: 3,
      name: 'Bookmark3',
      url: 'https://bookmark3.com',
      country: 'Country3',
      link: 'https://twitter.com/bookmark3',
      tags: [
        { name: 'Bookmark3-tag1' },
        { name: 'Bookmark3-tag2' }
      ]
    }
  ]
}

test('fetchState.pending: true', () => {
  const wrapper = factory({
    fetchState: { pending: true }
  })
  expect(wrapper.text()).toBe('...')
})

test('fetchState.error: true', () => {
  const wrapper = factory({
    fetchState: { error: true }
  })
  expect(wrapper.text()).toBe('Request failure.')
})

test('fetchState.pending: false', async () => {
  const wrapper = factory({
    fetchState: { pending: false }
  })
  await wrapper.setData(data)

  const a = wrapper.findAll('a')
  expect(a.length).toBe(9)

  expect(a.at(0).text()).toBe('Bookmark1')
  expect(a.at(0).element.href).toBe('https://bookmark1.com/')
  expect(a.at(0).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country1')
  expect(a.at(1).props().to).toEqual({ query: { tag: 'Bookmark1-tag1' } })
  expect(a.at(2).props().to).toEqual({ query: { tag: 'Bookmark1-tag2' } })

  expect(a.at(3).text()).toBe('Bookmark2')
  expect(a.at(3).element.href).toBe('https://bookmark2.com/')
  expect(a.at(3).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country2')
  expect(a.at(4).props().to).toEqual({ query: { tag: 'Bookmark2-tag1' } })
  expect(a.at(5).props().to).toEqual({ query: { tag: 'Bookmark2-tag2' } })

  expect(a.at(6).text()).toBe('Bookmark3')
  expect(a.at(6).element.href).toBe('https://bookmark3.com/')
  expect(a.at(6).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country3')
  expect(a.at(7).props().to).toEqual({ query: { tag: 'Bookmark3-tag1' } })
  expect(a.at(8).props().to).toEqual({ query: { tag: 'Bookmark3-tag2' } })
})
