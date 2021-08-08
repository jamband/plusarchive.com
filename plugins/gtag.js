import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ $config, app }, inject) => {
  const options = {
    config: {
      id: $config.googleAnalyticsTrackingId,
      params: {
        anonymize_ip: true
      }
    },
    enabled: false
  }
  inject('gtag', Vue.use(VueGtag, options, app.router))
}
