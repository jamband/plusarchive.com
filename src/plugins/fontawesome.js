import Vue from 'vue'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import free-solid
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faClock,
  faDatabase,
  faEllipsisH,
  faExternalLinkAlt,
  faInfoCircle,
  faLock,
  faPauseCircle,
  faPlayCircle,
  faRedoAlt,
  faTimes,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons'

// import free-brands
import {
  faBandcamp,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faLastfmSquare,
  faMixcloud,
  faPinterestSquare,
  faSoundcloud,
  faSpotify,
  faTumblrSquare,
  faTwitter,
  faTwitterSquare,
  faVimeoSquare,
  faYoutubeSquare
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  // add free-solid
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faClock,
  faDatabase,
  faEllipsisH,
  faExternalLinkAlt,
  faInfoCircle,
  faLock,
  faPauseCircle,
  faPlayCircle,
  faRedoAlt,
  faTimes,
  faVolumeUp,

  // add free-brands
  faBandcamp,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faLastfmSquare,
  faMixcloud,
  faPinterestSquare,
  faSoundcloud,
  faSpotify,
  faTumblrSquare,
  faTwitter,
  faTwitterSquare,
  faVimeoSquare,
  faYoutubeSquare
)

Vue.component('fa', FontAwesomeIcon) // eslint-disable-line
