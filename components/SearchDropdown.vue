<template>
  <b-dropdown variant="link" toggle-class="badge badge-secondary" menu-class="menu" no-caret>
    <template slot="button-content">
      {{ $route.query[query] || label }}
      <fa icon="angle-down" fixed-width />
    </template>
    <b-dropdown-item :to="resetLink(query)" exact>
      Reset
    </b-dropdown-item>
    <b-dropdown-divider />
    <b-dropdown-item v-for="(item, index) in items" :key="index" :to="itemLink(query, item)" append exact>
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
      type: Array,
      required: true
    }
  },
  methods: {
    resetLink (key) {
      const query = { ...this.$route.query }
      if (query.page) { delete query.page }
      if (query[key]) { delete query[key] }
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

<style lang="scss" scoped>
/deep/ {
  .menu {
    height: auto;
    max-height: 352px;
    overflow-x: hidden;
  }

  button {
    &:hover {
      color: $white;
    }
  }
}
</style>
