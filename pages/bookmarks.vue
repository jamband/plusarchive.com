<template>
  <div class="row">
    <div class="col-lg-4">
      <h1 class="mt-0 mb-3">Bookmarks</h1>
      <NLink :to="{ name: 'bookmarks' }" class="tag">
        <fa icon="redo-alt" size="sm" /> Reset All
      </NLink>
      <TotalCount class="me-3" :total="pagination.totalCount" />
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
      <div class="row">
        <div v-for="bookmark in bookmarks" :key="bookmark.id" class="col-lg-6 mb-3 mb-sm-4">
          <a :href="bookmark.url" class="fw-bold" rel="noopener" target="_blank">
            <fa icon="external-link-alt" size="sm" fixed-width />
            {{ bookmark.name }}
          </a>
          <br>
          <span class="me-2 text-body">Country:</span>
          {{ bookmark.country }}
          <br>
          <span class="me-2 text-body">Link:</span>
          <BrandIconLink :links="bookmark.link" />
          <br>
          <span class="me-2 text-body">Tag:</span>
          <NLink
            v-for="tag in bookmark.tags"
            :key="tag.id"
            class="tag"
            :to="{ query: { tag: tag.name } }"
          >
            {{ tag.name }}
          </NLink>
          <hr class="text-muted">
        </div>
      </div>
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
