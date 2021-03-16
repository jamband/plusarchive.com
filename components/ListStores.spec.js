import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ListStores from './ListStores'

const factory = ({ props }) => {
  return shallowMount(ListStores, {
    propsData: props,
    stubs: {
      fa: true,
      NLink: RouterLinkStub,
      BrandIconLink: true,
      AppLoading: { template: '<div>...</div>' },
      PaginationMinimal: true
    }
  })
}

const props = {
  stores: [
    {
      id: 1,
      name: 'Store1',
      url: 'https://store1.com',
      country: 'Country1',
      link: 'https://twitter.com/store1',
      tags: [
        { name: 'Store1-tag1' },
        { name: 'Store1-tag2' }
      ]
    },
    {
      id: 2,
      name: 'Store2',
      url: 'https://store2.com',
      country: 'Country2',
      link: 'https://twitter.com/store2',
      tags: [
        { name: 'Store2-tag1' },
        { name: 'Store2-tag2' }
      ]
    },
    {
      id: 3,
      name: 'Store3',
      url: 'https://store3.com',
      country: 'Country3',
      link: 'https://twitter.com/store3',
      tags: [
        { name: 'Store3-tag1' },
        { name: 'Store3-tag2' }
      ]
    }
  ]
}

test('labels', () => {
  const wrapper = factory({ props })
  const a = wrapper.findAll('a')
  expect(a.length).toBe(9)

  expect(a.at(0).text()).toBe('Store1')
  expect(a.at(0).element.href).toBe('https://store1.com/')
  expect(a.at(0).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country1')
  expect(a.at(1).props().to).toEqual({ query: { tag: 'Store1-tag1' } })
  expect(a.at(2).props().to).toEqual({ query: { tag: 'Store1-tag2' } })

  expect(a.at(3).text()).toBe('Store2')
  expect(a.at(3).element.href).toBe('https://store2.com/')
  expect(a.at(3).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country2')
  expect(a.at(4).props().to).toEqual({ query: { tag: 'Store2-tag1' } })
  expect(a.at(5).props().to).toEqual({ query: { tag: 'Store2-tag2' } })

  expect(a.at(6).text()).toBe('Store3')
  expect(a.at(6).element.href).toBe('https://store3.com/')
  expect(a.at(6).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country3')
  expect(a.at(7).props().to).toEqual({ query: { tag: 'Store3-tag1' } })
  expect(a.at(8).props().to).toEqual({ query: { tag: 'Store3-tag2' } })
})
