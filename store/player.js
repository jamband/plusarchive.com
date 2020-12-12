import { APP_COLOR_PRIMARY } from '~/plugins/constants'

const state = () => ({
  loading: false,
  id: '',
  title: '',
  provider: '',
  type: '',
  src: ''
})

const mutations = {
  setItem (state, item) {
    state.id = item.id
    state.title = item.title
    state.provider = item.provider
    state.type = item.type
    state.src = item.src
  },
  loading (state, status) {
    state.loading = status
  },
  clear (state) {
    state.id = ''
    state.title = ''
    state.provider = ''
    state.type = ''
    state.src = ''
  }
}

const actions = {
  fetchItem ({ commit }, item) {
    let src

    if (item.provider === 'Bandcamp') {
      src = 'https://bandcamp.com/EmbeddedPlayer'
      const params = `size=large/tracklist=false/bgcol=333333/linkcol=${APP_COLOR_PRIMARY}`
      src = item.type === 'track'
        ? `${src}/track=${item.provider_key}/${params}`
        : `${src}/album=${item.provider_key}/${params}`
    }

    if (item.provider === 'SoundCloud') {
      src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com'
      const params = `show_comments=false&color=${APP_COLOR_PRIMARY}&hide_related=true`
      src = item.type === 'track'
        ? `${src}/tracks/${item.provider_key}&${params}&visual=true`
        : `${src}/playlists/${item.provider_key}&${params}&show_playcount=false`
    }

    if (item.provider === 'Vimeo') {
      src = `https://player.vimeo.com/video/${item.provider_key}`
    }

    if (item.provider === 'YouTube') {
      src = 'https://www.youtube.com/embed'
      const params = 'rel=0&playsinline=1'
      src = item.type === 'track'
        ? `${src}/${item.provider_key}?${params}`
        : `${src}/videoseries?list=${item.provider_key}&${params}`
    }

    commit('setItem', {
      id: item.id,
      title: item.title,
      provider: item.provider,
      type: item.type,
      src
    })
  },
  loading ({ commit }, { status }) {
    commit('loading', status)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

export default {
  state,
  mutations,
  actions
}
