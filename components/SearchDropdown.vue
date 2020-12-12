<template>
  <b-dropdown variant="link" toggle-class="badge badge-secondary" menu-class="menu" no-caret>
    <template slot="button-content">
      {{ $route.query[query] || label }}
      <fa icon="angle-down" fixed-width />
    </template>
    <b-dropdown-item :to="resetLink(query)" exact>
      Reset
    </b-dropdown-item>
    <div class="dropdown-divider" />
    <div v-if="$fetchState.pending">
      <AppLoading />
    </div>
    <div v-else-if="$fetchState.error">
      Request failure.
    </div>
    <b-dropdown-item v-for="(item, index) in list" v-else :key="index" :to="itemLink(query, item)" append exact>
      {{ item }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    items: {
      type: [Array, String],
      required: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  async fetch () {
    this.list = typeof this.items === 'string'
      ? await this.$axios.$get(this.items)
      : this.items
  },
  methods: {
    resetLink (key) {
      const query = { ...this.$route.query }
      if (query.page) { delete query.page }
      if (query[key] || query[key] === '') { delete query[key] }
      return { query }
    },
    itemLink (key, value) {
      const query = { ...this.$route.query }
      if (query.page) { delete query.page }
      if (query.search) { delete query.search }
      return { query: { ...query, [key]: value } }
    }
  }
}
</script>
