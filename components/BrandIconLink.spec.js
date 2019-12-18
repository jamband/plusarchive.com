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
    ].join('\n')

    const wrapper = factory({ links })

    const a = wrapper.findAll('a')
    expect(a.length).toBe(2)
    expect(a.at(0).element.href).toBe('https://example.com/foo')
    expect(a.at(1).element.href).toBe('https://example.com/bar')

    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(2)
    expect(svg.at(0).attributes()['data-prefix']).toBe('fas')
    expect(svg.at(0).attributes()['data-icon']).toBe('external-link-alt')
    expect(svg.at(1).attributes()['data-prefix']).toBe('fas')
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
    ].join('\n')

    const wrapper = factory({ links })

    const a = wrapper.findAll('a')
    expect(a.length).toBe(12)
    expect(a.at(0).element.href).toBe('https://bandcamp.com/foo')
    expect(a.at(1).element.href).toBe('https://facebook.com/foo')
    expect(a.at(2).element.href).toBe('https://instagram.com/foo')
    expect(a.at(3).element.href).toBe('https://last.fm/foo')
    expect(a.at(4).element.href).toBe('https://mixcloud.com/foo')
    expect(a.at(5).element.href).toBe('https://pinterest.com/foo')
    expect(a.at(6).element.href).toBe('https://soundcloud.com/foo')
    expect(a.at(7).element.href).toBe('https://spotify.com/foo')
    expect(a.at(8).element.href).toBe('https://twitter.com/foo')
    expect(a.at(9).element.href).toBe('https://tumblr.com/foo')
    expect(a.at(10).element.href).toBe('https://vimeo.com/foo')
    expect(a.at(11).element.href).toBe('https://youtube.com/foo')

    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(12)
    expect(svg.at(0).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(0).attributes()['data-icon']).toBe('bandcamp')
    expect(svg.at(1).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(1).attributes()['data-icon']).toBe('facebook-square')
    expect(svg.at(2).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(2).attributes()['data-icon']).toBe('instagram')
    expect(svg.at(3).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(3).attributes()['data-icon']).toBe('lastfm-square')
    expect(svg.at(4).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(4).attributes()['data-icon']).toBe('mixcloud')
    expect(svg.at(5).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(5).attributes()['data-icon']).toBe('pinterest-square')
    expect(svg.at(6).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(6).attributes()['data-icon']).toBe('soundcloud')
    expect(svg.at(7).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(7).attributes()['data-icon']).toBe('spotify')
    expect(svg.at(8).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(8).attributes()['data-icon']).toBe('twitter-square')
    expect(svg.at(9).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(9).attributes()['data-icon']).toBe('tumblr-square')
    expect(svg.at(10).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(10).attributes()['data-icon']).toBe('vimeo-square')
    expect(svg.at(11).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(11).attributes()['data-icon']).toBe('youtube-square')
  })

  test('custom domain for Bandcamp', () => {
    const links = [
      'https://fikarecordings.com/foo',
      'https://mamabirdrecordingco.com/foo',
      'https://maybemars.org/foo',
      'https://souterraine.biz/foo'
    ].join('\n')

    const wrapper = factory({ links })

    const a = wrapper.findAll('a')
    expect(a.length).toBe(4)
    expect(a.at(0).element.href).toBe('https://fikarecordings.com/foo')
    expect(a.at(1).element.href).toBe('https://mamabirdrecordingco.com/foo')
    expect(a.at(2).element.href).toBe('https://maybemars.org/foo')
    expect(a.at(3).element.href).toBe('https://souterraine.biz/foo')

    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(4)
    expect(svg.at(0).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(0).attributes()['data-icon']).toBe('bandcamp')
    expect(svg.at(1).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(1).attributes()['data-icon']).toBe('bandcamp')
    expect(svg.at(2).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(2).attributes()['data-icon']).toBe('bandcamp')
    expect(svg.at(3).attributes()['data-prefix']).toBe('fab')
    expect(svg.at(3).attributes()['data-icon']).toBe('bandcamp')
  })
})
