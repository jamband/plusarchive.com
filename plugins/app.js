import Vue from 'vue'
import { APP_NAME } from '~/utils/constants'

Vue.prototype.$app = {
  name: APP_NAME
}
