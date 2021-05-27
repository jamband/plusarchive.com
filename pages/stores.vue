<template>
  <div class="row">
    <div class="col-lg-4">
      <h1 class="mt-0 mb-3">Stores</h1>
      <NLink :to="{ name: 'stores' }" class="text-light">
        <fa icon="redo-alt" size="sm" fixed-width /> Reset All
      </NLink>
      <TotalCount class="mx-3" :total="pagination.totalCount" />
      <br class="d-md-none d-lg-block">
      <SearchDropdown
        id="searchStoresCountries"
        class="d-inline-block"
        label="Countries"
        query="country"
        items="stores/countries"
      />
      <SearchDropdown
        id="searchStoresTags"
        class="d-inline-block"
        label="Tags"
        query="tag"
        items="stores/tags"
      />
      <SearchForm class="d-md-none my-2" />
    </div>
    <div class="col-lg-8 mt-md-3 mt-lg-0">
      <ListStores :stores="stores" />
      <PaginationMinimal
        :current-page="pagination.currentPage"
        :page-count="pagination.pageCount"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, query, store }) {
    const stores = await $axios.$get(
      `stores${query.q ? '/search' : ''}?expand=tags`,
      { params: query }
    )

    store.dispatch('pagination/fetchItem', stores._meta)

    return {
      stores: stores.items
    }
  },
  head () {
    return {
      title: 'Stores'
    }
  },
  computed: {
    pagination () {
      return this.$store.state.pagination
    }
  },
  watchQuery: ['country', 'page', 'q', 'tag']
}
</script>
