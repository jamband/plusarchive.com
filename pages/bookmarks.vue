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
        <article
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          class="col-lg-6 mb-3"
        >
          <section class="mb-1">
            <a :href="bookmark.url" rel="noopener" target="_blank">
              <strong>
                <fa icon="external-link-alt" fixed-width />
                {{ bookmark.name }}
              </strong>
            </a>
          </section>
          <section class="mb-1">
            <span class="me-2 text-body">Country:</span>
            {{ bookmark.country }}
          </section>
          <section class="mb-1">
            <span class="me-2 text-body">Links:</span>
            <BrandIconLink :links="bookmark.link" />
          </section>
          <section class="mb-1">
            <span class="me-2 text-body">Tags:</span>
            <NLink
              v-for="tag in bookmark.tags"
              :key="tag.id"
              class="tag"
              :to="{ query: { tag: tag.name } }"
            >
              {{ tag.name }}
            </NLink>
          </section>
          <hr class="text-muted">
        </article>
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

    return {
      bookmarks: bookmarks.items,
      pagination: bookmarks._meta
    }
  },
  head () {
    return {
      title: 'Bookmarks'
    }
  },
  watchQuery: ['country', 'page', 'q', 'tag']
}
</script>
