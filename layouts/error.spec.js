import { mount, createLocalVue } from '@vue/test-utils'
import Error from '~/layouts/error'
import pluginApp from '~/plugins/app'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(pluginApp)
localVue.use(pluginFontAwesome)

const factory = (props = {}) => {
  return mount(Error, {
    propsData: props
  })
}

describe('layouts: error', () => {
  test('header text when { statusCode: 404 }', () => {
    const wrapper = factory({ error: { statusCode: 404 } })
    expect(wrapper.find('h1').text()).toBe('Not Found (#404) - PlusArchive')
  })

  test('header text when { statusCode: 500 }', () => {
    const wrapper = factory({ error: { statusCode: 500 } })
    expect(wrapper.find('h1').text()).toBe('An Error Occurred (#500) - PlusArchive')
  })

  test('message when { statusCode: 404 }', () => {
    const wrapper = factory({ error: { statusCode: 404 } })
    expect(wrapper.find('.alert').text()).toBe('Page not found.')
  })

  test('message when { statusCode: 500 }', () => {
    const wrapper = factory({ error: { statusCode: 500 } })
    expect(wrapper.find('.alert').text()).toBe('An error occurred.')
  })
})
