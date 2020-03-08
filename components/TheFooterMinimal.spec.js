import { mount, createLocalVue } from '@vue/test-utils'
import TheFooterMinimal from '~/components/TheFooterMinimal'
import pluginApp from '~/plugins/app'

const localVue = createLocalVue()

localVue.use(pluginApp)

const factory = () => {
  return mount(TheFooterMinimal, {
    localVue
  })
}

test('text', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe('PlusArchive')
})
