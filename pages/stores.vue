<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Stores</h2>
      <NLink :to="{ name: 'stores' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br>
      <SearchDropdown label="Countries" query="country" items="stores/countries" />
      <SearchDropdown label="Tags" query="tag" items="stores/tags" />
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <div class="col-lg-8">
      <ListStores :stores="stores" />
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
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
