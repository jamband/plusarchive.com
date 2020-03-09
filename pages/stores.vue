<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Stores</h2>
      <NLink :to="{ name: 'stores' }" class="text-light">
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
        <div v-for="store in stores" :key="store.id" class="col-lg-6 mb-4">
          <BaseLinkExternal :href="store.url" class="font-weight-bold">
            <fa icon="external-link-alt" fixed-width /> {{ store.name }}
          </BaseLinkExternal>
          <br>
          <span class="badge badge-secondary">Country:</span>
          {{ store.country }}
          <br>
          <span class="badge badge-secondary">Link:</span>
          <BrandIconLink :links="store.link" />
          <br>
          <span class="badge badge-secondary">Tag:</span>
          <NLink v-for="tag in store.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
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
import BaseLinkExternal from '~/components/BaseLinkExternal'
import BrandIconLink from '~/components/BrandIconLink'
import PaginationMinimal from '~/components/PaginationMinimal'
import SearchDropdown from '~/components/SearchDropdown'
import SearchForm from '~/components/SearchForm'
import TotalCount from '~/components/TotalCount'

export default {
  components: {
    BaseLinkExternal,
    BrandIconLink,
    PaginationMinimal,
    SearchDropdown,
    SearchForm,
    TotalCount
  },
  async fetch ({ store, query, error }) {
    await Promise.all([
      store.dispatch('store/fetchItems', { query, error }),
      store.dispatch('store/fetchCountriesAndTags', { error })
    ])
  },
  computed: {
    stores () {
      return this.$store.state.store.items
    },
    countries () {
      return this.$store.state.store.countries
    },
    tags () {
      return this.$store.state.store.tags
    },
    pagination () {
      return this.$store.state.pagination
    }
  },
  head () {
    return {
      title: 'Stores'
    }
  },
  watchQuery: true
}
</script>
