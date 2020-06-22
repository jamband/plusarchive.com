import { mount, createLocalVue } from '@vue/test-utils'
import PageAbout from '~/pages/about'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(pluginFontAwesome)

const $app = {
  name: 'Foo'
}

const factory = () => {
  return mount(PageAbout, {
    localVue,
    mocks: {
      $app
    }
  })
}

test('is visible', () => {
  const wrapper = factory()

  expect(wrapper.text()).toContain('About')
  expect(wrapper.text()).toContain(`${$app.name} is`)

  const a = wrapper.findAll('a')
  expect(a.at(0).element.href).toBe('https://github.com/jamband/plusarchive.com')
})
