/** @jest-environment jsdom */
import { shallowMount } from '@vue/test-utils'
import BrandIconLink from '.'

const factory = ({ links }) => {
  return shallowMount(BrandIconLink, {
    propsData: {
      links
    },
    stubs: {
      fa: true
    }
  })
}

test('not brand icon links', () => {
  const links = [
    'https://example.com/foo',
    'https://example.com/bar'
  ]

  const wrapper = factory({ links: links.join('\n') })

  const a = wrapper.findAll('a')
  expect(a.length).toBe(links.length)
  expect(a.at(0).element.href).toBe('https://example.com/foo')
  expect(a.at(1).element.href).toBe('https://example.com/bar')

  const fa = wrapper.findAll('fa-stub')
  expect(fa.length).toBe(2)

  expect(fa.at(0).attributes().icon).toBe('fas,external-link-alt')
  expect(fa.at(1).attributes().icon).toBe('fas,external-link-alt')
})

test('brand icon links', () => {
  const links = [
    'https://bandcamp.com/foo',
    'https://facebook.com/foo',
    'https://instagram.com/foo',
    'https://last.fm/foo',
    'https://mixcloud.com/foo',
    'https://pinterest.com/foo',
    'https://soundcloud.com/foo',
    'https://spotify.com/foo',
    'https://twitter.com/foo',
    'https://tumblr.com/foo',
    'https://vimeo.com/foo',
    'https://youtube.com/foo'
  ]

  const wrapper = factory({ links: links.join('\n') })

  const a = wrapper.findAll('a')
  expect(a.length).toBe(links.length)

  for (const i in links) {
    expect(a.at(i).element.href).toBe(links[i])
  }

  const fa = wrapper.findAll('fa-stub')
  expect(fa.length).toBe(links.length)

  for (const i in links) {
    expect(fa.at(i).attributes().icon).toContain('fab,')
  }

  const icons = [
    'bandcamp',
    'facebook-square',
    'instagram',
    'lastfm-square',
    'mixcloud',
    'pinterest-square',
    'soundcloud',
    'spotify',
    'twitter-square',
    'tumblr-square',
    'vimeo-square',
    'youtube-square'
  ]

  for (const i in icons) {
    expect(fa.at(i).attributes().icon).toBe(`fab,${icons[i]}`)
  }
})

test('custom domain for Bandcamp', () => {
  const links = [
    'https://fikarecordings.com/foo',
    'https://mamabirdrecordingco.com/foo',
    'https://maybemars.org/foo',
    'https://souterraine.biz/foo'
  ]

  const wrapper = factory({ links: links.join('\n') })

  const a = wrapper.findAll('a')
  expect(a.length).toBe(links.length)

  for (const i in links) {
    expect(a.at(i).element.href).toBe(links[i])
  }

  const fa = wrapper.findAll('fa-stub')
  expect(fa.length).toBe(links.length)

  for (const i in links) {
    expect(fa.at(i).attributes().icon).toBe('fab,bandcamp')
  }
})
