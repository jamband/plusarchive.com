import { APP_NAME, APP_COLOR_PRIMARY } from '~/plugins/constants'

export const app = {
  name: APP_NAME,
  color: {
    primary: APP_COLOR_PRIMARY
  }
}

export default (_, inject) => {
  inject('app', app)
}
