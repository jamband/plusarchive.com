<template>
  <div class="row">
    <div class="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <h1>Privacy Policy</h1>
      <p>
        This site uses Google Analytics.
        The Google Analytics tool collects internet log information and visitor
        behavior information in an anonymous form.
        About the information collected by Google Analytics,
        please see the following links.
      </p>
      <a href="https://policies.google.com/privacy?hl=en" rel="noopener" target="_blank">
        <fa icon="external-link-alt" /> Google Privacy & Terms
      </a>

      <h4 class="mt-5 mb-3">What is Google Analytics used for?</h4>
      <ul>
        <li>To know the traffic on this site and the use of web pages.</li>
        <li>To know where it was accessed.</li>
        <li>To know the type of OS and device.</li>
      </ul>
      Knowing them helps make this site better.

      <h4 class="mt-5 mb-3">How long is the retention period of data by Google Analytics?</h4>
      <p>
        Data retention period is <strong>"26 months"</strong>.
      </p>

      <h4 class="mt-5 mb-3">Google Analytics Opt-Out</h4>
      <p>
        If message related to Google Analytics is displayed at the bottom of the screen,
        it means that you have not consent to the privacy policy of this site yet.
        If you consent, please press the <strong>"I ACCEPT"</strong>.
      </p>
      <p>
        Ever after consenting, you can opt-out by pressing the following link:
        <button class="btn btn-link align-baseline m-0 p-0" @click="optOut()">Opt-Out</button>
      </p>

      <div class="my-5" />
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Privacy Policy'
    }
  },
  computed: {
    tracking () {
      return this.$store.state.tracking
    }
  },
  methods: {
    optOut () {
      if (this.tracking.disable) {
        alert('Google Analytics tracking is not yet enabled.')
      } else {
        this.$store.dispatch('tracking/disable')
        this.$gtag.optOut()
        alert('Opt-Out has been complete.')
      }
    }
  }
}
</script>
