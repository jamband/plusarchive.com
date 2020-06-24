import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { BNavbarBrand, BNavItem } from 'bootstrap-vue'
import TheHeader from '~/components/TheHeader'

const $app = {
  name: 'Foo'
}

const factory = (route = {}) => {
  return shallowMount(TheHeader, {
    stubs: {
      BDropdownItem: true,
      BNavbar: true,
      BNavbarBrand,
      BNavbarNav: true,
      BNavbarToggle: true,
      BNavItem,
      BNavItemDropdown: true,
      BCollapse: true,
      fa: true,
      NLink: RouterLinkStub,
      SearchForm: true
    },
    mocks: {
      $route: route,
      $app
    }
  })
}

test('brand text', () => {
  expect(factory({ name: 'home' }).find('.navbar-brand').text())
    .toBe($app.name)
})

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
    expect(links.length).toBe(1)
    expect(links.at(0).text()).toBe(text)
  }
})

test('whether is visible search form', () => {
  const form = {
    home: false,
    tracks: true,
    track: false,
    playlists: false,
    playlist: false,
    labels: true,
    stores: true,
    bookmarks: true,
    about: false,
    privacy: false,
    contact: false,
    'third-party-licences': false
  }
  for (const [route, exists] of Object.entries(form)) {
    expect(factory({ name: route }).find('searchform-stub').exists())
      .toBe(exists)
  }
})
