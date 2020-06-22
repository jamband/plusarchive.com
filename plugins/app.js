import { APP_NAME } from '~/utils/constants'

export const app = {
  name: APP_NAME
}

export default (_, inject) => {
  inject('app', app)
}
