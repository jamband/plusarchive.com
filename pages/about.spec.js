import { mount, createLocalVue } from '@vue/test-utils'
import PageAbout from '~/pages/about'
import pluginApp from '~/plugins/app'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(pluginApp)
localVue.use(pluginFontAwesome)

const factory = () => {
  return mount(PageAbout, {
    localVue
  })
}

test('is visible', () => {
  const wrapper = factory()

  expect(wrapper.text()).toContain('About')
  expect(wrapper.text()).toContain('PlusArchive is')

  const a = wrapper.findAll('a')
  expect(a.at(0).element.href).toBe('https://github.com/jamband/plusarchive.com')
})
