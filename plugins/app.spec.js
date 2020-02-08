import { createLocalVue } from '@vue/test-utils'
import pluginApp from '~/plugins/app'

const localVue = createLocalVue()

localVue.use(pluginApp)

const $app = localVue.prototype.$app

test('name', () => {
  expect($app.name).toBe('PlusArchive')
})
