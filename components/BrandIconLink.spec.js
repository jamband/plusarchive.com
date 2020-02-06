import { mount, createLocalVue } from '@vue/test-utils'
import BrandIconLink from '~/components/BrandIconLink'
import pluginFontAwesome from '~/plugins/fontawesome'

const localVue = createLocalVue()

localVue.use(pluginFontAwesome)

const factory = ({ links }) => {
  return mount(BrandIconLink, {
    localVue,
    propsData: { links }
  })
}

describe('components: BrandIconLink', () => {
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

    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(2)

    expect(svg.at(0).attributes()['data-prefix']).toBe('fas')
    expect(svg.at(1).attributes()['data-prefix']).toBe('fas')

    expect(svg.at(0).attributes()['data-icon']).toBe('external-link-alt')
    expect(svg.at(1).attributes()['data-icon']).toBe('external-link-alt')
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

    for (let i = 0; i < links.length; i++) {
      expect(a.at(i).element.href).toBe(links[i])
    }

    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(links.length)

    for (let i = 0; i < links.length; i++) {
      expect(svg.at(i).attributes()['data-prefix']).toBe('fab')
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

    for (let i = 0; i < links.length; i++) {
      expect(svg.at(i).attributes()['data-icon']).toBe(icons[i])
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

    for (let i = 0; i < links.length; i++) {
      expect(a.at(i).element.href).toBe(links[i])
    }

    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(links.length)

    for (let i = 0; i < links.length; i++) {
      expect(svg.at(i).attributes()['data-prefix']).toBe('fab')
    }

    for (let i = 0; i < links.length; i++) {
      expect(svg.at(i).attributes()['data-icon']).toBe('bandcamp')
    }
  })
})
