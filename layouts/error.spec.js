import { shallowMount } from '@vue/test-utils'
import Error from '~/layouts/error'

const $app = {
  name: 'Foo'
}

const factory = ({ props }) => {
  return shallowMount(Error, {
    propsData: props,
    stubs: {
      fa: true
    },
    mocks: {
      $app
    }
  })
}

test('when 404', () => {
  const props = { error: { statusCode: 404 } }
  const text = factory({ props }).text()
  expect(text).toContain(`Not Found (#404) - ${$app.name}`)
  expect(text).toContain('Page not found.')
})

test('when 500', () => {
  const props = { error: { statusCode: 500 } }
  const text = factory({ props }).text()
  expect(text).toContain(`An Error Occurred (#500) - ${$app.name}`)
  expect(text).toContain('An error occurred.')
})
