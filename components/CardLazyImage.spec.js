import { shallowMount } from '@vue/test-utils'
import CardLazyImage from '~/components/CardLazyImage'

const factory = (props = {}) => {
  return shallowMount(CardLazyImage, {
    propsData: {
      image: 'foo.jpg',
      ...props
    }
  })
}

test('image: foo.jpg, aspectratio: 1/1', () => {
  const wrapper = factory({ aspectratio: '1/1' })
  expect(wrapper.find('img').attributes()['data-src']).toBe('foo.jpg')
  expect(wrapper.find('img').attributes()['data-aspectratio']).toBe('1/1')
})

test('image: foo.jpg aspectratio: 16/9', () => {
  const wrapper = factory({ aspectratio: '16/9' })
  expect(wrapper.find('img').attributes()['data-src']).toBe('foo.jpg')
  expect(wrapper.find('img').attributes()['data-aspectratio']).toBe('16/9')
})

test('aspectratio validator', () => {
  const wrapper = factory({ aspectratio: '1/1' })
  const aspectratio = wrapper.vm.$options.props.aspectratio
  expect(aspectratio.validator('1/1')).toBe(true)
  expect(aspectratio.validator('16/9')).toBe(true)
  expect(aspectratio.validator('foo')).toBe(false)
})
