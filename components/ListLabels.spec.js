import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ListLabels from './ListLabels'

const factory = ({ props }) => {
  return shallowMount(ListLabels, {
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
  labels: [
    {
      id: 1,
      name: 'Label1',
      url: 'https://label1.com',
      country: 'Country1',
      link: 'https://twitter.com/label1',
      tags: [
        { name: 'Label1-tag1' },
        { name: 'Label1-tag2' }
      ]
    },
    {
      id: 2,
      name: 'Label2',
      url: 'https://label2.com',
      country: 'Country2',
      link: 'https://twitter.com/label2',
      tags: [
        { name: 'Label2-tag1' },
        { name: 'Label2-tag2' }
      ]
    },
    {
      id: 3,
      name: 'Label3',
      url: 'https://label3.com',
      country: 'Country3',
      link: 'https://twitter.com/label3',
      tags: [
        { name: 'Label3-tag1' },
        { name: 'Label3-tag2' }
      ]
    }
  ]
}

test('labels', () => {
  const wrapper = factory({ props })
  const a = wrapper.findAll('a')
  expect(a.length).toBe(9)

  expect(a.at(0).text()).toBe('Label1')
  expect(a.at(0).element.href).toBe('https://label1.com/')
  expect(a.at(0).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country1')
  expect(a.at(1).props().to).toEqual({ query: { tag: 'Label1-tag1' } })
  expect(a.at(2).props().to).toEqual({ query: { tag: 'Label1-tag2' } })

  expect(a.at(3).text()).toBe('Label2')
  expect(a.at(3).element.href).toBe('https://label2.com/')
  expect(a.at(3).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country2')
  expect(a.at(4).props().to).toEqual({ query: { tag: 'Label2-tag1' } })
  expect(a.at(5).props().to).toEqual({ query: { tag: 'Label2-tag2' } })

  expect(a.at(6).text()).toBe('Label3')
  expect(a.at(6).element.href).toBe('https://label3.com/')
  expect(a.at(6).element.target).toBe('_blank')
  expect(wrapper.html()).toContain('Country3')
  expect(a.at(7).props().to).toEqual({ query: { tag: 'Label3-tag1' } })
  expect(a.at(8).props().to).toEqual({ query: { tag: 'Label3-tag2' } })
})
