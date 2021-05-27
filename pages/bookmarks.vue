<template>
  <div class="row">
    <div class="col-lg-4">
      <h1 class="mt-0 mb-3">Bookmarks</h1>
      <NLink :to="{ name: 'bookmarks' }" class="text-light">
        <fa icon="redo-alt" size="sm" fixed-width /> Reset All
      </NLink>
      <TotalCount class="mx-3" :total="pagination.totalCount" />
      <br class="d-md-none d-lg-block">
      <SearchDropdown
        id="searchBookmarkCountries"
        class="d-inline-block"
        label="Countries"
        query="country"
        items="bookmarks/countries"
      />
      <SearchDropdown
        id="searchBookmarkTags"
        class="d-inline-block"
        label="Tags"
        query="tag"
        items="bookmarks/tags"
      />
      <SearchForm class="d-md-none my-2" />
    </div>
    <div class="col-lg-8 mt-md-3 mt-lg-0">
      <ListBookmarks :bookmarks="bookmarks" />
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
