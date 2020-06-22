import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { NavbarPlugin } from 'bootstrap-vue'
import TheHeader from '~/components/TheHeader'
import SearchForm from '~/components/SearchForm'

const localVue = createLocalVue()

localVue.use(NavbarPlugin)

const $app = {
  name: 'Foo'
}

const factory = (route = {}) => {
  return mount(TheHeader, {
    localVue,
    stubs: {
      fa: true,
      NLink: RouterLinkStub,
      SearchForm
    },
    mocks: {
      $route: route,
      $app
    }
  })
}

test('brand text', () => {
  const wrapper = factory({ name: 'home' })
  const brand = wrapper.findAll('.navbar-brand')
  expect(brand.length).toBe(1)
  expect(brand.at(0).text()).toBe($app.name)
})

test('active when { route: "home" }', () => {
  const wrapper = factory({ name: 'home' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).toContain('active')
  expect(a.at(1).attributes().class).not.toContain('active')
  expect(a.at(2).attributes().class).not.toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route: "tracks" }', () => {
  const wrapper = factory({ name: 'tracks' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).toContain('active')
  expect(a.at(2).attributes().class).not.toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route : "track" }', () => {
  const wrapper = factory({ name: 'track' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).toContain('active')
  expect(a.at(2).attributes().class).not.toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route : "playlists" }', () => {
  const wrapper = factory({ name: 'playlists' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).not.toContain('active')
  expect(a.at(2).attributes().class).toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route : "playlist" }', () => {
  const wrapper = factory({ name: 'playlist' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).not.toContain('active')
  expect(a.at(2).attributes().class).toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route : "labels" }', () => {
  const wrapper = factory({ name: 'labels' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).not.toContain('active')
  expect(a.at(2).attributes().class).not.toContain('active')
  expect(a.at(3).attributes().class).toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route : "stores" }', () => {
  const wrapper = factory({ name: 'stores' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).not.toContain('active')
  expect(a.at(2).attributes().class).not.toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).toContain('active')
  expect(a.at(5).attributes().class).not.toContain('active')
})

test('active when { route : "bookmarks" }', () => {
  const wrapper = factory({ name: 'bookmarks' })
  const a = wrapper.findAll('.nav-link')
  expect(a.at(0).attributes().class).not.toContain('active')
  expect(a.at(1).attributes().class).not.toContain('active')
  expect(a.at(2).attributes().class).not.toContain('active')
  expect(a.at(3).attributes().class).not.toContain('active')
  expect(a.at(4).attributes().class).not.toContain('active')
  expect(a.at(5).attributes().class).toContain('active')
})

test('whether is visible search form when { route: "tracks" }', () => {
  const wrapper = factory({ name: 'tracks' })
  const input = wrapper.findAll('input')
  expect(input.length).toBe(1)
  expect(input.at(0).element.placeholder).toContain('Search')
})

test('whether is visible search form when { route: "track" }', () => {
  const wrapper = factory({ name: 'track' })
  expect(wrapper.findAll('input').length).toBe(0)
})

test('whether is visible search form when { route: "playlists" }', () => {
  const wrapper = factory({ name: 'playlists' })
  expect(wrapper.findAll('input').length).toBe(0)
})

test('whether is visible search form when { route: "playlist" }', () => {
  const wrapper = factory({ name: 'playlist' })
  expect(wrapper.findAll('input').length).toBe(0)
})

test('whether is visible search form when { route: "labels" }', () => {
  const wrapper = factory({ name: 'labels' })
  const input = wrapper.findAll('input')
  expect(input.length).toBe(1)
  expect(input.at(0).element.placeholder).toContain('Search')
})

test('whether is visible search form when { route: "stores" }', () => {
  const wrapper = factory({ name: 'stores' })
  const input = wrapper.findAll('input')
  expect(input.length).toBe(1)
  expect(input.at(0).element.placeholder).toContain('Search')
})

test('whether is visible search form when { route: "bookmarks" }', () => {
  const wrapper = factory({ name: 'bookmarks' })
  const input = wrapper.findAll('input')
  expect(input.length).toBe(1)
  expect(input.at(0).element.placeholder).toContain('Search')
})
