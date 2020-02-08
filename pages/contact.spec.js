import { mount, createLocalVue } from '@vue/test-utils'
import PageContact from '~/pages/contact'
import pluginApp from '~/plugins/app'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(pluginApp)
localVue.use(pluginFontAwesome)

const factory = () => {
  return mount(PageContact, {
    localVue
  })
}

test('is visible', () => {
  const wrapper = factory()

  expect(wrapper.text()).toContain('Contact')
  expect(wrapper.text()).toContain('Please to')

  const a = wrapper.findAll('a')
  expect(a.at(0).element.href).toBe('https://twitter.com/livejam_db')
  expect(a.at(1).element.href).toBe('https://github.com/jamband/plusarchive.com/issues')
})
