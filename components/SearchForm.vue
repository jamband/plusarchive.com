<template>
  <form class="py-lg-0 py-2" @submit.prevent="onSubmit()">
    <input v-model="q" :class="inputClass" :placeholder="placeholder" type="search">
  </form>
</template>

<script>
export default {
  props: {
    inputClass: {
      type: String,
      default: 'form-control'
    },
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
