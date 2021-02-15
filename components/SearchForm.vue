<template>
  <fieldset class="py-lg-0 py-2">
    <input
      v-model="q"
      class="form-control"
      :placeholder="placeholder"
      type="search"
      @keyup.enter="onSubmit()"
    >
  </fieldset>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  data () {
    return {
      q: ''
    }
  },
  watch: {
    '$route.query.q' () {
      this.resetValue()
    }
  },
  mounted () {
    this.resetValue()
  },
  methods: {
    onSubmit () {
      this.$router.push({
        name: this.$route.name.endsWith('-search')
          ? this.$route.name
          : `${this.$route.name}-search`,
        query: { q: this.q }
      })
    },
    resetValue () {
      this.q = this.$route.query.q || ''
    }
  }
}
</script>
