<template>
  <div class="py-lg-0 py-2">
    <input v-model="search" :class="inputClass" :placeholder="placeholder" type="text" @keyup.enter="onSubmit()">
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'search'
    },
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
      search: ''
    }
  },
  watch: {
    '$route.query' () {
      this.search = this.$route.query[this.name] || ''
    }
  },
  methods: {
    onSubmit () {
      this.$router.push({
        query: { [this.name]: this.search }
      })
    }
  }
}
</script>
