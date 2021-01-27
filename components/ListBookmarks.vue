<template>
  <div class="col-lg-8">
    <div v-if="$fetchState.pending" class="text-center">
      <AppLoading />
    </div>
    <div v-else-if="$fetchState.error">
      Request failure.
    </div>
    <div v-else>
      <div class="row">
        <div v-for="bookmark in bookmarks" :key="bookmark.id" class="col-lg-6 mb-4">
          <a :href="bookmark.url" class="font-weight-bold" rel="noopener" target="_blank">
            <fa icon="external-link-alt" fixed-width /> {{ bookmark.name }}
          </a>
          <br>
          <span class="badge badge-secondary">Country:</span>
          {{ bookmark.country }}
          <br>
          <span class="badge badge-secondary">Link:</span>
          <BrandIconLink :links="bookmark.link" />
          <br>
          <span class="badge badge-secondary">Tag:</span>
          <NLink v-for="tag in bookmark.tags" :key="tag.id" :to="{ query: { tag: tag.name } }" class="badge badge-secondary" append>
            {{ tag.name }}
          </NLink>
          <hr>
        </div>
      </div>
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bookmarks: [],
      pagination: {}
    }
  },
  async fetch () {
    const bookmarks = await this.$axios.$get(
      `bookmarks${this.$route.query.q ? '/search' : ''}?expand=tags`,
      { params: this.$route.query }
    )
    this.bookmarks = bookmarks.items
    this.pagination = bookmarks._meta
    this.$store.dispatch('pagination/fetchItem', this.pagination)
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>
