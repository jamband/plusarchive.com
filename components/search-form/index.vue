<template>
  <fieldset :disabled="disabled()">
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
  name: 'SearchForm',
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
    disabled () {
      return ![
        'tracks',
        'tracks-search',
        'labels',
        'labels-search',
        'stores',
        'stores-search',
        'bookmarks',
        'bookmarks-search'
      ].includes(this.$route.name || '')
    },
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
