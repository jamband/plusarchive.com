import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import TheHeader from './TheHeader'

const factory = (route = {}) => {
  return shallowMount(TheHeader, {
    stubs: {
      AppDropdown: true,
      AppDropdownLink: true,
      fa: true,
      NLink: RouterLinkStub,
      SearchForm: true
    },
    mocks: {
      $route: route
    }
  })
}

test('link active', () => {
  const links = {
    home: 'Home',
    tracks: 'Tracks',
    track: 'Tracks',
    playlists: 'Playlists',
    playlist: 'Playlists',
    labels: 'Labels',
    stores: 'Stores',
    bookmarks: 'Bookmarks',
    about: 'About',
    privacy: 'Privacy',
    contact: 'Contact',
    'third-party-licenses': 'Third-Party Licenses'
  }
  for (const [route, text] of Object.entries(links)) {
    const links = factory({ name: route }).findAll('.nav-link.active')
    expect(links.at(0).text()).toBe(text)
  }
})
