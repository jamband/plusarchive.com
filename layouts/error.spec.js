import { shallowMount } from '@vue/test-utils'
import ErrorPage from './error'
import { APP_NAME } from '~/constants/app'

const factory = ({ props }) => {
  return shallowMount(ErrorPage, {
    propsData: props,
    stubs: {
      fa: true
    }
  })
}

test('when 404', () => {
  const props = { error: { statusCode: 404 } }
  const text = factory({ props }).text()
  expect(text).toContain(`Not Found (#404) - ${APP_NAME}`)
  expect(text).toContain('Page not found.')
})

test('when 500', () => {
  const props = { error: { statusCode: 500 } }
  const text = factory({ props }).text()
  expect(text).toContain(`An Error Occurred (#500) - ${APP_NAME}`)
  expect(text).toContain('An error occurred.')
})
