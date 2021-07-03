import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import TheHeader from './TheHeader'

const factory = (route = {}) => {
  return shallowMount(TheHeader, {
    stubs: {
      AppDropdown: true,
      AppDropdownHeader: true,
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
    tracks: 'Tracks',
    'tracks-search': 'Tracks',
    'tracks-id': 'Tracks',
    playlists: 'Playlists',
    'playlists-id': 'Playlists',
    labels: 'Labels',
    'labels-search': 'Labels',
    stores: 'Stores',
    'stores-search': 'Stores',
    bookmarks: 'Bookmarks',
    'bookmarks-search': 'Bookmarks'
  }
  for (const [routeName, text] of Object.entries(links)) {
    const links = factory({ name: routeName }).findAll('.nav-link.active')
    expect(links.length).toBe(2)
    expect(links.at(0).text()).toBe(text)
    expect(links.at(1).text()).toBe(text)
  }

  const moreLinks = {
    about: 'About',
    privacy: 'Privacy',
    contact: 'Contact',
    'third-party-licenses': 'Third-Party Licenses'
  }
  for (const [routeName, text] of Object.entries(moreLinks)) {
    const links = factory({ name: routeName }).findAll('.nav-link.active')
    expect(links.length).toBe(1)
    expect(links.at(0).text()).toBe(text)
  }
})
