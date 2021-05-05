<template>
  <div class="row">
    <div class="col-lg-4">
      <h2 class="my-2">Bookmarks</h2>
      <NLink :to="{ name: 'bookmarks' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br>
      <SearchDropdown label="Countries" query="country" items="bookmarks/countries" />
      <SearchDropdown label="Tags" query="tag" items="bookmarks/tags" />
      <SearchForm class="d-lg-none mt-1 mb-3" />
    </div>
    <div class="col-lg-8">
      <ListBookmarks :bookmarks="bookmarks" />
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, query, store }) {
    const bookmarks = await $axios.$get(
      `bookmarks${query.q ? '/search' : ''}?expand=tags`,
      { params: query }
    )

    store.dispatch('pagination/fetchItem', bookmarks._meta)

    return {
      bookmarks: bookmarks.items
    }
  },
  head () {
    return {
      title: 'Bookmarks'
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
