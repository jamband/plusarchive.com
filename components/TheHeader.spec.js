import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import AppDropdown from '~/components/AppDropdown'
import AppDropdownLink from '~/components/AppDropdownLink'
import TheHeader from '~/components/TheHeader'

const factory = (route = {}) => {
  return shallowMount(TheHeader, {
    stubs: {
      AppDropdown,
      AppDropdownLink,
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
    tracks: 'Track',
    track: 'Track',
    playlists: 'Playlist',
    playlist: 'Playlist',
    labels: 'Label',
    stores: 'Store',
    bookmarks: 'Bookmark',
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
