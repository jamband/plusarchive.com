<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Labels</h2>
      <nuxt-link :to="{ name: 'labels' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </nuxt-link>
      <TotalCount />
      <br>
      <b-dropdown variant="link" toggle-class="badge badge-secondary" no-caret>
        <template slot="button-content">
          <SortLabel query="sort" label="Sort" />
          <fa icon="angle-down" fixed-width />
        </template>
        <b-dropdown-item :to="$url.removeQuery($route, 'sort')" exact>Reset</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item :to="$url.appendQuery($route, 'sort', 'Name')" append exact>Name</b-dropdown-item>
        <b-dropdown-item :to="$url.appendQuery($route, 'sort', 'Latest')" append exact>Latest</b-dropdown-item>
      </b-dropdown>
      <b-dropdown variant="link" toggle-class="badge badge-secondary" menu-class="scrollable-menu" no-caret>
        <template slot="button-content">
          <SortLabel query="country" label="Countries" />
          <fa icon="angle-down" fixed-width />
        </template>
        <b-dropdown-item :to="$url.removeQuery($route, 'country')" exact>Reset</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item v-for="country in countries" :key="country" :to="$url.appendQuery($route, 'country', country)" append exact>{{ country }}</b-dropdown-item>
      </b-dropdown>
      <b-dropdown variant="link" toggle-class="badge badge-secondary" menu-class="scrollable-menu" no-caret>
        <template slot="button-content">
          <SortLabel query="tag" label="Tags" />
          <fa icon="angle-down" fixed-width />
        </template>
        <b-dropdown-item :to="$url.removeQuery($route, 'tag')" exact>Reset</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item v-for="tag in tags" :key="tag" :to="$url.appendQuery($route, 'tag', tag)" append exact>{{ tag }}</b-dropdown-item>
      </b-dropdown>
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <div class="col-lg-8">
      <div class="row">
        <div v-for="label in labels" :key="label.id" class="col-lg-6 mb-4">
          <a :href="label.url" class="font-weight-bold" rel="noopener" target="_blank">
            <fa icon="external-link-alt" fixed-width /> {{ label.name }}
          </a>
          <br>
          <span class="badge badge-secondary">Country:</span>
          {{ label.country }}
          <br>
          <span class="badge badge-secondary">Link:</span>
          <BrandIconLink :links="label.link" />
          <br>
          <span class="badge badge-secondary">Tag:</span>
          <nuxt-link v-for="tag in label.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
            {{ tag.name }}
          </nuxt-link>
          <hr class="text-light">
        </div>
      </div>
      <PaginationMinimal />
    </div>
  </div>
</template>

<script>
import BrandIconLink from '~/components/BrandIconLink'
import PaginationMinimal from '~/components/PaginationMinimal'
import SearchForm from '~/components/SearchForm'
import SortLabel from '~/components/SortLabel'
import TotalCount from '~/components/TotalCount'

export default {
  components: {
    BrandIconLink,
    PaginationMinimal,
    SearchForm,
    SortLabel,
    TotalCount
  },
  async fetch ({ store, query, error }) {
    await Promise.all([
      store.dispatch('label/fetchItems', { query, error }),
      store.dispatch('label/fetchCountriesAndTags', { error })
    ])
  },
  computed: {
    labels () {
      return this.$store.state.label.items
    },
    countries () {
      return this.$store.state.label.countries
    },
    tags () {
      return this.$store.state.label.tags
    }
  },
  head () {
    return {
      title: `Labels - ${this.$app.name}`
    }
  },
  watchQuery: true
}
</script>
