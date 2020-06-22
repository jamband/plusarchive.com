import { mount } from '@vue/test-utils'
import TheFooterMinimal from '~/components/TheFooterMinimal'

const $app = {
  name: 'Foo'
}

const factory = () => {
  return mount(TheFooterMinimal, {
    mocks: {
      $app
    }
  })
}

test('text', () => {
  const wrapper = factory()
  expect(wrapper.text()).toBe($app.name)
})
