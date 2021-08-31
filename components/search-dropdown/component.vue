<template>
  <AppDropdown :id="id" :label="$route.query[query] || label">
    <AppDropdownHeader>Actions</AppDropdownHeader>
    <AppDropdownLink :to="resetLink(query)">
      Reset
    </AppDropdownLink>
    <AppDropdownDivider />
    <AppDropdownHeader>{{ label }}</AppDropdownHeader>
    <AppDropdownText v-if="$fetchState.pending">
      <AppLoading />
    </AppDropdownText>
    <AppDropdownText v-else-if="$fetchState.error">
      Request failure.
    </AppDropdownText>
    <AppDropdownLink
      v-for="(item, index) in list"
      v-else
      :key="index"
      :to="itemLink(query, item)"
    >
      {{ item }}
    </AppDropdownLink>
  </AppDropdown>
</template>

<script>
import { AppDropdown } from '~/components/app-dropdown'
import { AppDropdownDivider } from '~/components/app-dropdown-divider'
import { AppDropdownHeader } from '~/components/app-dropdown-header'
import { AppDropdownLink } from '~/components/app-dropdown-link'
import { AppDropdownText } from '~/components/app-dropdown-text'
import { AppLoading } from '~/components/app-loading'

export default {
  name: 'SearchDropdown',
  components: {
    AppDropdown,
    AppDropdownDivider,
    AppDropdownHeader,
    AppDropdownLink,
    AppDropdownText,
    AppLoading
  },
  props: {
    id: {
      type: String,
      required: true
    },
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
      if (this.$route.name.endsWith('-search')) {
        return {
          name: this.$route.name.substring(0, this.$route.name.indexOf('-'))
        }
      }
      const query = { ...this.$route.query }
      if (query.page) { delete query.page }
      if (query[key] || query[key] === '') { delete query[key] }
      return { query }
    },
    itemLink (key, value) {
      if (this.$route.name.endsWith('-search')) {
        return {
          name: this.$route.name.substring(0, this.$route.name.indexOf('-')),
          query: { [key]: value }
        }
      }
      const query = { ...this.$route.query }
      if (query.page) { delete query.page }
      return { query: { ...query, [key]: value } }
    }
  }
}
</script>
