<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Labels</h2>
      <NLink :to="{ name: 'labels' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br>
      <SearchDropdown label="Countries" query="country" :items="countries" />
      <SearchDropdown label="Tags" query="tag" :items="tags" />
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
          <NLink v-for="tag in label.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
            {{ tag.name }}
          </NLink>
          <hr class="text-light">
        </div>
      </div>
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
    </div>
  </div>
</template>

<script>
import BrandIconLink from '~/components/BrandIconLink'
import PaginationMinimal from '~/components/PaginationMinimal'
import SearchDropdown from '~/components/SearchDropdown'
import SearchForm from '~/components/SearchForm'
import TotalCount from '~/components/TotalCount'

export default {
  components: {
    BrandIconLink,
    PaginationMinimal,
    SearchDropdown,
    SearchForm,
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
    },
    pagination () {
      return this.$store.state.pagination
    }
  },
  head () {
    return {
      title: 'Labels'
    }
  },
  watchQuery: true
}
</script>
