import { createLocalVue } from '@vue/test-utils'
import pluginUrl from '~/plugins/url'

const localVue = createLocalVue()
localVue.use(pluginUrl)

describe('plugins: url', () => {
  let route
  const $url = localVue.prototype.$url

  test('appendQuery', () => {
    route = { name: 'tracks' }
    expect($url.appendQuery(route, 'provider', 'Bandcamp'))
      .toEqual({ query: { provider: 'Bandcamp' } })

    route = { name: 'tracks', query: { page: 2 } }
    expect($url.appendQuery(route, 'provider', 'Bandcamp'))
      .toEqual({ query: { provider: 'Bandcamp' } })

    route = { name: 'tracks', query: { search: 'foo' } }
    expect($url.appendQuery(route, 'provider', 'Bandcamp'))
      .toEqual({ query: { provider: 'Bandcamp' } })
  })

  test('removeQuery', () => {
    route = { name: 'tracks', query: { provider: 'Bandcamp' } }
    expect($url.removeQuery(route, 'provider'))
      .toEqual({ query: {} })

    route = { name: 'tracks', query: { provider: 'Bandcamp', page: 2 } }
    expect($url.removeQuery(route, 'provider'))
      .toEqual({ query: {} })
  })
})
