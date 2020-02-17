import { APP_PRIMARY_COLOR } from '~/utils/constants'

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
  fetchItem ({ commit, rootState }, { type }) {
    const music = type === 'track'
      ? rootState.track.item
      : rootState.playlist.item

    let src

    if (music.provider === 'Bandcamp') {
      src = 'https://bandcamp.com/EmbeddedPlayer'
      const params = `size=large/tracklist=false/bgcol=333333/linkcol=${APP_PRIMARY_COLOR}`
      src = type === 'track'
        ? `${src}/track=${music.provider_key}/${params}`
        : `${src}/album=${music.provider_key}/${params}`
    }

    if (music.provider === 'SoundCloud') {
      src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com'
      const params = `show_comments=false&color=${APP_PRIMARY_COLOR}&hide_related=true`
      src = type === 'track'
        ? `${src}/tracks/${music.provider_key}&${params}&visual=true`
        : `${src}/playlists/${music.provider_key}&${params}&show_playcount=false`
    }

    if (music.provider === 'Vimeo') {
      src = `https://player.vimeo.com/video/${music.provider_key}`
    }

    if (music.provider === 'YouTube') {
      src = 'https://www.youtube.com/embed'
      const params = 'rel=0&playsinline=1'
      src = type === 'track'
        ? `${src}/${music.provider_key}?${params}`
        : `${src}/videoseries?list=${music.provider_key}&${params}`
    }

    commit('setItem', {
      id: music.id,
      title: music.title,
      provider: music.provider,
      type,
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
