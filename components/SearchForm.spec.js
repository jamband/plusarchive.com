import { mount, createLocalVue } from '@vue/test-utils'
import pluginUrl from '~/plugins/url'
import SearchForm from '~/components/SearchForm'

const localVue = createLocalVue()

localVue.use(pluginUrl)

const factory = (props = {}, router = {}) => {
  return mount(SearchForm, {
    localVue,
    propsData: props,
    mocks: {
      $router: router,
      $route: {}
    }
  })
}

describe('components: SearchForm', () => {
  test('name: default', () => {
    const routerPush = jest.fn()
    const wrapper = factory({}, { push: routerPush })
    wrapper.trigger('submit.prevent')
    expect(routerPush).toHaveBeenCalledWith({ query: { search: '' } })
  })

  test('name: foo', () => {
    const routerPush = jest.fn()
    const wrapper = factory({ name: 'foo' }, { push: routerPush })
    wrapper.trigger('submit.prevent')
    expect(routerPush).toHaveBeenCalledWith({ query: { foo: '' } })
  })

  test('inputClass: default', () => {
    const wrapper = factory()
    expect(wrapper.find('input').attributes().class).toBe('form-control')
  })

  test('inputClass: foo', () => {
    const wrapper = factory({ inputClass: 'foo' })
    expect(wrapper.find('input').attributes().class).toBe('foo')
  })

  test('placeholder: default', () => {
    const wrapper = factory()
    expect(wrapper.find('input').element.placeholder).toBe('Search...')
  })

  test('placeholder: foo', () => {
    const wrapper = factory({ placeholder: 'foo' })
    expect(wrapper.find('input').element.placeholder).toBe('foo')
  })

  test('data: search=foo', () => {
    const routerPush = jest.fn()
    const wrapper = factory({}, { push: routerPush })
    wrapper.setData({ search: 'foo' })
    wrapper.trigger('submit.prevent')
    expect(routerPush).toHaveBeenCalledWith({ query: { search: 'foo' } })
  })
})
